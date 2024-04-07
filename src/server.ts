import App from "@/app";
import { AuthRoute } from "@routes/auth.route";
import { UserRoute } from "@routes/users.route";
import { CompaniesRoute } from "./routes/companies.route";
import { LeadsRoute } from "./routes/leads.route";

const app = new App([new AuthRoute(), new UserRoute(), new LeadsRoute(), new CompaniesRoute()]);

app.listen();
