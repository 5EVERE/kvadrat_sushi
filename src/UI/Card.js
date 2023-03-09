import styles from "./Card.module.css";

const Card = function (props) {
  return <div className={styles.card}>{props.children}</div>;
};
export default Card;
