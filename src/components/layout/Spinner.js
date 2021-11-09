import "./Spinner.css";

function Spinner() {
    return (
      <div className="cssload-pgloading">
        <div className="cssload-loadingwrap">
          <ul className="cssload-bokeh">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    );
}

export default Spinner;
