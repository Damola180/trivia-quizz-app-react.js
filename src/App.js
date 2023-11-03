import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Startpage from "./components/startPage";
import Questiontabs from "./components/questiontabs";

function App() {
  // Usestate used
  // Usestate used
  // to render the questionstab

  const [queOne, setQueOne] = useState([]);

  const [renderOne, setRenderOne] = useState(true);

  const [recallApi, setRecallApi] = useState(true);
  const [CheckAnsPlayagain, setCheckAnsPlayagain] = useState(true);

  const [buttonOptions, setButtonOptions] = useState();

  const handleButtonClick = (outerIndex, innerIndex) => {
    if (CheckAnsPlayagain) {
      const update = [...buttonOptions];
      const updateToUse = update.map((eachUpdate, eachUpdateIndex) => {
        if (eachUpdateIndex === outerIndex) {
          let nestedUpdate = [...eachUpdate];
          for (let i = 0; i < nestedUpdate.length; i++) {
            nestedUpdate[i].haveBeenClicked = false;
            nestedUpdate[i].style = "transparent";
          }
          nestedUpdate[innerIndex].haveBeenClicked =
            !nestedUpdate[innerIndex].haveBeenClicked;
          nestedUpdate[innerIndex].style = "#427D9D";

          return nestedUpdate;
        } else {
          return eachUpdate;
        }
      });

      setButtonOptions(updateToUse);
    } else {
      alert("click on play again fam ");
    }
  };

  // checkanswers
  // checkanswers
  let correctAnsQue = [];
  const [numberOFQUEGotRight, setnumberOFQUEGotRight] = useState([]);

  function checkAnswers(params) {
    if (CheckAnsPlayagain) {
      queOne.forEach((que, index) => {
        let QuecorrectAns = que.correct_answer;
        correctAnsQue.push(QuecorrectAns);
      });
      const checkAnswersOptionsBox = [...buttonOptions];
      checkAnswersOptionsBox.map(
        (checkAnswersOptions, checkAnswersindexBox) => {
          return checkAnswersOptions.map((eachbuttons, indexeachbuttons) => {
            if (
              eachbuttons.haveBeenClicked &&
              eachbuttons.value === correctAnsQue[checkAnswersindexBox]
            ) {
              eachbuttons.amiThecorrectAnswer = true;
              eachbuttons.style = "green";
            } else if (
              eachbuttons.haveBeenClicked &&
              eachbuttons.value !== correctAnsQue[checkAnswersindexBox]
            ) {
              eachbuttons.amiThecorrectAnswer = false;
              eachbuttons.style = "red";
              queOne[checkAnswersindexBox].wasSelected = "";
            } else if (
              eachbuttons.value === correctAnsQue[checkAnswersindexBox]
            ) {
              eachbuttons.amiThecorrectAnswer = false;
              eachbuttons.style = "green";
            }

            return eachbuttons;
          });
        }
      );

      for (let u = 0; u < checkAnswersOptionsBox.length; u++) {
        const isAnyClicked = checkAnswersOptionsBox[u].some(
          (eachbuttons) => eachbuttons.haveBeenClicked
        );

        if (!isAnyClicked) {
          queOne[u].wasSelected = "none was selected, answer in yellow-bg";
        }
      }

      // mapping check if any of the questions option was not selected

      checkAnswersOptionsBox.map(
        (checkAnswersOptions, checkAnswersBoxYellowIndex) => {
          return checkAnswersOptions.map((eachbuttons, indexeachbuttons) => {
            if (
              queOne[checkAnswersBoxYellowIndex].wasSelected ===
                "none was selected, answer in yellow-bg" &&
              eachbuttons.value === correctAnsQue[checkAnswersBoxYellowIndex]
            ) {
              eachbuttons.style = "yellow";
            }
            return eachbuttons;
          });
        }
      );

      // Your score input
      const filteredOptions = checkAnswersOptionsBox.flatMap((options) =>
        options.filter(
          (eachbuttons) =>
            eachbuttons.amiThecorrectAnswer === true &&
            eachbuttons.style === "green"
        )
      );

      setnumberOFQUEGotRight(filteredOptions);

      setButtonOptions(checkAnswersOptionsBox);
      setCheckAnsPlayagain(!CheckAnsPlayagain);
    } else {
      setRecallApi();
    }
  }
  // // shuffle ans option fn

  function shuffleArray(array) {
    const newArray = [...array];

    for (let i = newArray.length - 1; i > 0; i--) {
      // Generate a random index between 0 and i (inclusive)
      const randomIndex = Math.floor(Math.random() * (i + 1));

      // Swap elements at randomIndex and i
      [newArray[i], newArray[randomIndex]] = [
        newArray[randomIndex],
        newArray[i],
      ];
    }

    return newArray;
  }

  const pageHandleClick = () => {
    setRenderOne(false);
  };

  // fetch api with use effect

  useEffect(() => {
    async function logMovies() {
      try {
        const response = await fetch(
          "https://opentdb.com/api.php?amount=5&category=21&type=multiple"
        );

        if (!response.ok) {
          throw new Error("API failed to be fetched");
        }

        const movies = await response.json();

        const singlemovies = movies.results.map((movie, index) => ({
          ...movie,
          wasSelected: "",
        }));
        setQueOne(singlemovies);
        setCheckAnsPlayagain(true); // Set CheckAnsPlayagain here if the API call is successful
        window.scroll({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      } catch (error) {
        console.log(error.message);
      }
    }

    logMovies();
  }, [recallApi]);

  useEffect(() => {
    let sortArray = [];
    queOne.forEach((que, index) => {
      let correctAns = que.correct_answer;
      let incorrectAns = que.incorrect_answers;
      let mergedAnsOptions = incorrectAns.concat(correctAns);
      let shuffledArray = shuffleArray(mergedAnsOptions);
      sortArray.push(shuffledArray);
    });

    const formattedData = sortArray.map((optionsArray, index) => {
      return optionsArray.map((option, innerIndex) => {
        return {
          id: index * 100 + innerIndex,
          haveBeenClicked: false,

          amiThecorrectAnswer: false,

          value: option,
          style: "transparent",
        };
      });
    });
    setButtonOptions(formattedData);
  }, [queOne]);
  function propsQuestiontab() {
    return (
      <div className="whole-Questions">
        {queOne.map((eachqueAPi, index) => {
          return (
            <div className="each_questions" key={index}>
              <p>{eachqueAPi.question}</p>
              <span>{eachqueAPi.wasSelected}</span>
              {buttonOptions[index].map((eachButtonsVal, innerIndex) => {
                return (
                  <button
                    className="Optioneachbutton"
                    style={{ backgroundColor: eachButtonsVal.style }}
                    onClick={() =>
                      handleButtonClick(index, innerIndex, eachButtonsVal)
                    }
                    key={innerIndex}
                  >
                    {eachButtonsVal.value}
                  </button>
                );
              })}
            </div>
          );
        })}

        <p className="your-score">
          {CheckAnsPlayagain
            ? ""
            : `Your Score: ${numberOFQUEGotRight.length}/${queOne.length}`}
        </p>

        <button onClick={() => checkAnswers()} className="checkAnswer-btn">
          {CheckAnsPlayagain ? "checkAnswer" : "PlayAgain"}
        </button>
      </div>
    );
  }

  // app component rendered here

  return (
    <div>
      {renderOne ? (
        <Startpage onClick={pageHandleClick} />
      ) : (
        <Questiontabs EachQuestions={propsQuestiontab()} />
      )}
    </div>
  );
}

export default App;
