import Modal from "../UI/Modal";
const AuthModal = function (props) {
  return (
    <Modal>
      <h1>Ваш Обліковий Запис</h1>
      <div>
        <img src={props.img}></img>
      </div>
      <div>{props.email}</div>
      <button onClick={props.onLogout}>Log out</button>
      <button onClick={props.onClose}>Close</button>
    </Modal>
  );
};
export default AuthModal;
