import { Fragment, h } from "preact";
import { useEffect } from "preact/hooks";

const SurveyDetails = ({ id, url }) => {
  useEffect(() => {
    const pathname = window.location.pathname;
    window.history.replaceState({}, document.title, pathname);
  }, []);
  const showModal = url.indexOf("from=create") !== -1;
  return (
    <Fragment>
      {showModal && <div>Insert modal here</div>}
      <form method="POST" action={`/surveys/${id}/responses`}>
        <input type="hidden" name="surveyId" value={id} />
        <div>
          <label>
            Salary
            <input name="salary"></input>
          </label>
        </div>
        <div>
          <label>
            Email (only used to send when result is ready)
            <input name="email" type="email"></input>
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </Fragment>
  );
};

export default SurveyDetails;
