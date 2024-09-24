import "./Home.scss";
import { useEffect, useRef, useState } from "react";
import ThinkEmoji from "../../assets/images/thinkingFace-cartoon-rb.png";
import DefaultSpin from "../../assets/images/defaultSpin-rb.png";
import DownArrow from "../../assets/images/arrowDown-cartoon-rb.png";
import defaultFood from "../../data/defaultFoodTypes.json";
import FoodDetail from "../FoodDetail/FoodDetail";

function Home() {
  const [isSpin, setIsSpin] = useState(false);
  const spinWheel = useRef("");
  const [rotationDegree, setRotationDegree] = useState(0);
  const [previousDegree, setPreviousDegree] = useState(0);
  const [selected, setSelected] = useState("");
  const downArrow = useRef("");
  const [selectedFood, setSelectedFood] = useState("");
  const [isModal, setIsModal] = useState(false);

  // wheel refs:
  const ramen = useRef("");
  const salad = useRef("");
  const pasta = useRef("");
  const smoothie = useRef("");
  const cupcake = useRef("");
  const burger = useRef("");
  const steak = useRef("");
  const pizza = useRef("");

  useEffect(() => {
    const wheelElement = spinWheel.current;

    const stopSpin = () => {
      detectCollision();
      setIsSpin(false);
      setIsModal(true);
    };

    if (wheelElement) {
      wheelElement.addEventListener("animationend", stopSpin);
    }

    return () => {
      if (wheelElement) {
        wheelElement.removeEventListener("animationend", stopSpin);
      }
    };
  }, []);

  // Create a dynamic style for keyframes
  useEffect(() => {
    const styleSheet = document.styleSheets[0];
    const keyframes = `
        @keyframes spinWheel {
          0% {
            transform: rotate(${previousDegree}deg);
          }
          100% {
            transform: rotate(${rotationDegree + 720 * 1.5}deg);
          }
        }
      `;

    // Append the keyframes to the stylesheet
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
  }, [rotationDegree]);

  function generateRandom(max, min) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const spinTheWheel = () => {
    setSelected("");
    setPreviousDegree(rotationDegree % 360);
    let max = generateRandom(360 * 8, 500);
    let min = generateRandom(360 * 5, 720);
    const randomDegree = Math.floor(Math.random() * (max - min + 1) + min);
    setRotationDegree(randomDegree);
    setIsSpin(true);
  };

  function detectCollision() {
    const arrow = downArrow.current.getBoundingClientRect();

    const foodTypes = [
      {
        ref: ramen,
        bound: ramen.current.getBoundingClientRect(),
      },
      {
        ref: salad,
        bound: salad.current.getBoundingClientRect(),
      },
      {
        ref: pasta,
        bound: pasta.current.getBoundingClientRect(),
      },
      {
        ref: smoothie,
        bound: smoothie.current.getBoundingClientRect(),
      },
      {
        ref: cupcake,
        bound: cupcake.current.getBoundingClientRect(),
      },
      {
        ref: burger,
        bound: burger.current.getBoundingClientRect(),
      },
      {
        ref: steak,
        bound: steak.current.getBoundingClientRect(),
      },
      {
        ref: pizza,
        bound: pizza.current.getBoundingClientRect(),
      },
    ];

    foodTypes.forEach((type) => {
      if (
        Math.round(type.bound.right) > Math.round(arrow.left) &&
        Math.round(type.bound.left) < Math.round(arrow.right) &&
        Math.round(type.bound.bottom) > Math.round(arrow.top) &&
        Math.round(type.bound.top) < Math.round(arrow.bottom)
      ) {
        setSelected(type.ref.current);
        showFood(type.ref.current);
        return;
      }
    });
  }

  function showFood(ref) {
    let food;
    switch (ref.textContent.toLowerCase()) {
      case "ramen":
        food = defaultFood.find((f) => f.name.toLowerCase() === "ramen");
        break;
      case "salad":
        food = defaultFood.find((f) => f.name.toLowerCase() === "salad");
        break;
      case "pasta":
        food = defaultFood.find((f) => f.name.toLowerCase() === "pasta");
        break;
      case "smoothie":
        food = defaultFood.find(
          (f) => f.name.toLowerCase() === "smoothie"
        );
        break;
      case "cupcake":
        food = defaultFood.find(
          (f) => f.name.toLowerCase() === "cupcake"
        );
        break;
      case "burger":
        food = defaultFood.find((f) => f.name.toLowerCase() === "burger");
        break;
      case "steak":
        food = defaultFood.find((f) => f.name.toLowerCase() === "steak");
        break;
      case "pizza":
        food = defaultFood.find((f) => f.name.toLowerCase() === "pizza");
        break;
      default:
        break;
    }

    if (food) {
      setSelectedFood({
        name: food.name,
        img: food.image,
        text: food.funFact,
      });
    } else {
      setSelectedFood({
        name: "",
        img: "",
        text: "",
      });
    }
  }

  const closeModal = () => setIsModal(false);

  return (
    <>
      <main className="food-coma">
        <div className="food-coma__main main">
          <div className="main__title">
            <h1 className="main__title-header">
              {selectedFood ? `Not a fan of ${selectedFood.name}` : "Got Food Coma"}?
            </h1>
            <p className="main__title-text">
              Spin the Wheel
            </p>
          </div>

          <div className="main__wheel wheel">
            <div className="wheel__spin food">
              <div
                ref={spinWheel}
                className="wheel__spin-default-img"
                style={
                  isSpin
                    ? {
                        backgroundImage: `url(${DefaultSpin}`,
                        animation: `spinWheel 8s ease-in-out forwards`,
                      }
                    : {
                        backgroundImage: `url(${DefaultSpin}`,
                        rotate: `${rotationDegree}deg`,
                      }
                }
              >
                <p ref={ramen} className={`food-ramen`}>
                  Ramen
                </p>
                <p ref={salad} className={`food-salad`}>
                  Salad
                </p>
                <p ref={pasta} className={`food-pasta`}>
                  Pasta
                </p>
                <p ref={smoothie} className={`food-smoothie`}>
                  Smoothie
                </p>
                <p ref={cupcake} className={`food-cupcake`}>
                  Cupcake
                </p>
                <p ref={burger} className={`food-burger`}>
                  Burger
                </p>
                <p ref={steak} className={`food-steak`}>
                  Steak
                </p>
                <p ref={pizza} className={`food-pizza`}>
                  Pizza
                </p>
              </div>
              <img
                ref={downArrow}
                className="food__arrow"
                src={DownArrow}
                alt="Arrow Down to show which type of food is selected"
              />
            </div>
            <img
              className="wheel__thinking-img"
              src={ThinkEmoji}
              alt="Thinking face emoji for spin the wheel center"
              onClick={spinTheWheel}
            />
          </div>
        </div>

        {selected && isModal && (
          <FoodDetail closeModal={closeModal} selectedFood={selectedFood} />
        )}
      </main>
    </>
  );
}

export default Home;
