import {Link} from "react-router-dom";

export const ReportsPage = () => {
  return (
    <div className={"root"}>
      <nav className="navbar navbar-light bg-light">
        <Link to={"/students"} className="navbar-brand">Students</Link>
      </nav>
      <nav className="navbar navbar-light bg-light">
        <Link to={"/groups"} className="navbar-brand">Groups</Link>
      </nav>
    </div>
  )
}