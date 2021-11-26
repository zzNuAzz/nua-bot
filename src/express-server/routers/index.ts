import express, { Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import pushUETNewsNotification from "@/express-server/controllers/push-uet-news-notification";
import { verifySign } from "@/express-server/middleware/auth";
const app = express();

app.use(helmet());
app.use(morgan("common"));
app.use(express.json());

const PORT = process.env.PORT || 5555;
app.get("/ping", (req: Request, res: Response) => res.send("pong"));

app.post("/push-uet-news-notification", verifySign, pushUETNewsNotification);

app.listen(PORT, () => {
	console.log(`⚡️[server]: Server is running at PORT: ${PORT}`);
});
