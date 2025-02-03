import { IMessage } from "../page";
import Loader from "./Loader";
import styles from "./ChatLog.module.css";

const ChatLog = ({ log }: { log: IMessage[] }) => {
  return (
    <div className="chat-log-container">
      <div className="chat-log">
        {log.map((message, index) => (
          <div
            key={index}
            className={`${styles.message} ${styles[message.sender]}`}
          >
            <div>{message.content}</div>
          </div>
        ))}
        <div className="message bot">
          {log.at(-1)?.sender === "user" && log.length ? <Loader /> : ""}
        </div>
      </div>
    </div>
  );
};

export default ChatLog;
