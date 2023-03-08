const Message = ({ message, className }) => {
  return (
    <div className="content-message">
      <div className={className.join(" ")}> {message}</div>
    </div>
  );
};

export default Message;
