import { useState, useEffect } from "react";
import styles from "./MealList.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem";
// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: 'Рол "Найомі"',
//     description:
//       "Сир Філадельфія, куряче філе, масаго, помідор, огірок, кунжут",
//     price: 11.99,
//   },
//   {
//     id: "m2",
//     name: "Спайс в лососі",
//     description: "Рис, лосось, соус спайс",
//     price: 3.99,
//   },
//   {
//     id: "m3",
//     name: "Суші з вугрем",
//     description: "Вугор копчений, соус унагі, кунжут",
//     price: 4.99,
//   },
//   {
//     id: "m4",
//     name: 'Салат "Поке з лососем"',
//     description:
//       "Рис, лосось, огірок, чука, норі, стружка тунця, соус горіховий",
//     price: 7.99,
//   },
// ];
const MealList = function () {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchMeals = async function () {
      setIsLoading(true);
      const response = await fetch(
        "https://react-http-6ffa9-default-rtdb.firebaseio.com/meals.json"
      );
      if (response.ok !== true) {
        throw new Error("Fetching meals failed");
      }
      const responseData = await response.json();
      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setError(error);
    });
  }, []);
  if (isLoading) {
    return (
      <section className={styles.loading}>
        <p>Загрузка даних з сервера</p>
      </section>
    );
  }
  if (error) {
    return (
      <section className={styles.error}>
        <p>{error}</p>
      </section>
    );
  }

  const mealList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
};
export default MealList;
