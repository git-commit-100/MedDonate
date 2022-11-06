import styles from "./card.module.scss";

const Card = ({ children, className, onClick }) => {
  return (
    <div
      className={className ? `${className} ${styles.card}` : `${styles.card}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
