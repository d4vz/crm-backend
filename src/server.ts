import App from "@/app";
import { AuthRoute } from "@/application/routes/auth.route";
import { UserRoute } from "@/application/routes/users.route";
import { CompaniesRoute } from "./application/routes/companies.route";
import { LeadsRoute } from "./application/routes/leads.route";

const app = new App([new AuthRoute(), new UserRoute(), new LeadsRoute(), new CompaniesRoute()]);

app.listen();
