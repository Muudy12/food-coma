import "./FoodComa.scss";
import FoodComaLogo from "../../assets/food-coma/logos/food-coma-logo.png";
import MuPortLogo from "../../assets/logos/mu-port.png";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ThinkEmoji from "../../assets/food-coma/images/thinkingFace-cartoon-rb.png";
import DefaultSpin from "../../assets/food-coma/images/defaultSpin-rb.png";
import DownArrow from "../../assets/food-coma/images/arrowDown-cartoon-rb.png";
import RamenImg from "../../assets/food-coma/images/ramen-cartoon-rb.png";
import SaladImg from "../../assets/food-coma/images/salad-cartoon-rb.png";
import PastaImg from "../../assets/food-coma/images/pasta-cartoon-rb.png";
import SmoothieImg from "../../assets/food-coma/images/smoothie-cartoon-rb.png";
import CupcakeImg from "../../assets/food-coma/images/cupcake-cartoon-rb.png";
import BurgerImg from "../../assets/food-coma/images/burger-cartoon-rb.png";
import SteakImg from "../../assets/food-coma/images/steak-cartoon-rb.png";
import PizzaImg from "../../assets/food-coma/images/pizza-cartoon-rb.png";

function FoodComa() {
  const navigate = useNavigate();
  const [isSpin, setIsSpin] = useState(false);
  const spinWheel = useRef();
  const [rotationDegree, setRotationDegree] = useState(0);
  const [previousDegree, setPreviousDegree] = useState(0);
  const [selected, setSelected] = useState("");
  const downArrow = useRef();
  const [selectedFood, setSelectedFood] = useState("");
  const [isModal, setIsModal] = useState(false);

  // wheel refs:
  const ramen = useRef();
  const salad = useRef();
  const pasta = useRef();
  const smoothie = useRef();
  const cupcake = useRef();
  const burger = useRef();
  const steak = useRef();
  const pizza = useRef();

  useEffect(() => {
    const link = document.querySelector("link[rel~='icon'");
    link.href = FoodComaLogo;
    document.title = "Food Coma";
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
    switch (ref.textContent.toLowerCase()) {
      case "ramen":
        setSelectedFood({
          name: ref.textContent,
          img: RamenImg,
          text: "Salads are a versatile and nutritious meal option that can be customized to suit a variety of tastes and dietary needs. They typically consist of a base of leafy greens, such as lettuce, spinach, or kale, and can be enriched with a variety of other vegetables, fruits, proteins (like chicken, tofu, or beans), nuts, seeds, and dressings. Salads can be served as appetizers, side dishes, or main courses.",
        });
        break;
      case "salad":
        setSelectedFood({
          name: ref.textContent,
          img: SaladImg,
          text: "Salads are a versatile and nutritious meal option that can be customized to suit a variety of tastes and dietary needs. They typically consist of a base of leafy greens, such as lettuce, spinach, or kale, and can be enriched with a variety of other vegetables, fruits, proteins (like chicken, tofu, or beans), nuts, seeds, and dressings. Salads can be served as appetizers, side dishes, or main courses.",
        });
        break;
      case "pasta":
        setSelectedFood({
          name: ref.textContent,
          img: PastaImg,
          text: "Salads are a versatile and nutritious meal option that can be customized to suit a variety of tastes and dietary needs. They typically consist of a base of leafy greens, such as lettuce, spinach, or kale, and can be enriched with a variety of other vegetables, fruits, proteins (like chicken, tofu, or beans), nuts, seeds, and dressings. Salads can be served as appetizers, side dishes, or main courses.",
        });
        break;
      case "smoothie":
        setSelectedFood({
          name: ref.textContent,
          img: SmoothieImg,
          text: "Salads are a versatile and nutritious meal option that can be customized to suit a variety of tastes and dietary needs. They typically consist of a base of leafy greens, such as lettuce, spinach, or kale, and can be enriched with a variety of other vegetables, fruits, proteins (like chicken, tofu, or beans), nuts, seeds, and dressings. Salads can be served as appetizers, side dishes, or main courses.",
        });
        break;
      case "cupcake":
        setSelectedFood({
          name: ref.textContent,
          img: CupcakeImg,
          text: "Salads are a versatile and nutritious meal option that can be customized to suit a variety of tastes and dietary needs. They typically consist of a base of leafy greens, such as lettuce, spinach, or kale, and can be enriched with a variety of other vegetables, fruits, proteins (like chicken, tofu, or beans), nuts, seeds, and dressings. Salads can be served as appetizers, side dishes, or main courses.",
        });
        break;
      case "burger":
        setSelectedFood({
          name: ref.textContent,
          img: BurgerImg,
          text: "Salads are a versatile and nutritious meal option that can be customized to suit a variety of tastes and dietary needs. They typically consist of a base of leafy greens, such as lettuce, spinach, or kale, and can be enriched with a variety of other vegetables, fruits, proteins (like chicken, tofu, or beans), nuts, seeds, and dressings. Salads can be served as appetizers, side dishes, or main courses.",
        });
        break;
      case "steak":
        setSelectedFood({
          name: ref.textContent,
          img: SteakImg,
          text: "Salads are a versatile and nutritious meal option that can be customized to suit a variety of tastes and dietary needs. They typically consist of a base of leafy greens, such as lettuce, spinach, or kale, and can be enriched with a variety of other vegetables, fruits, proteins (like chicken, tofu, or beans), nuts, seeds, and dressings. Salads can be served as appetizers, side dishes, or main courses.",
        });
        break;
      case "pizza":
        setSelectedFood({
          name: ref.textContent,
          img: PizzaImg,
          text: "Salads are a versatile and nutritious meal option that can be customized to suit a variety of tastes and dietary needs. They typically consist of a base of leafy greens, such as lettuce, spinach, or kale, and can be enriched with a variety of other vegetables, fruits, proteins (like chicken, tofu, or beans), nuts, seeds, and dressings. Salads can be served as appetizers, side dishes, or main courses.",
        });
        break;
      default:
        break;
    }
  }

  const closeModal = () => setIsModal(false);

  return (
    <>
      <div className="food-coma">
        <header className="food-coma__header header">
          <nav className="header__nav nav">
            <img
              className="nav__mu-port"
              src={MuPortLogo}
              alt="Mu Portfolio Logo"
              onClick={() => navigate("/")}
            />
            <ul className="nav__list">
              <li className="nav__list-item">
                <a className="" href="/food-coma">
                  Dashboard
                </a>
              </li>
            </ul>
          </nav>
        </header>

        <div className="food-coma__main main">
          <div className="main__title">
            <h1 className="main__title-header">
              Got Food {selectedFood ? selectedFood.name : "Coma"}?
            </h1>
            <p className="main__title-text">
              Then it is time you spin the wheel!
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
          <div className="food-coma__modal modal">
            <div className="modal__container">
              <button className="modal__close-btn" onClick={closeModal}>
                CLOSE
              </button>
              <div className="modal-title">
                <img
                  className="modal-title__img"
                  src={selectedFood.img}
                  alt={selectedFood.name}
                />
                <div className="modal-title__details details">
                  <h3 className="details__heading">
                    You have landed on '{selectedFood.name}' recipes!
                  </h3>
                  <p className="details__text">{selectedFood.text}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default FoodComa;
