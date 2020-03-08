import { Fragment, h } from "preact";

const SurveyDetails = ({ id }) => {
  return (
    <Fragment>
      <form method="POST" action={`/surveys/${id}/responses`}>
        <input type="hidden" name="id" value={id} />
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
