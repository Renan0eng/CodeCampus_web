import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from './views/login';
import Feed from './views/feed';
import Team from './views/team';
import Files from './views/files';
import NewFeed from './views/newFeed';
import { AuthProvider } from "./contexts/authContext";
import { PrivateRoute } from "./routes";

function App() {


  return (<>
    <BrowserRouter>
    	<AuthProvider>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/feed" element={<PrivateRoute />}>
            <Route path="/feed" element={<Feed/>}/>
          </Route>
          <Route path="/team" element={<PrivateRoute />}>
            <Route path="/team" element={<Team/>}/>
          </Route>
          <Route path="/files" element={<PrivateRoute />}>
            <Route path="/files" element={<Files/>}/>
          </Route>
          <Route path="/feed/newfeed" element={<PrivateRoute />}>
            <Route path="/feed/newfeed" element={<NewFeed/>}/>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </>);
}

export default App;