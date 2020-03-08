import { Fragment, h } from "preact";

const CreateSurvey = () => {
  return (
    <Fragment>
      <p>
        Ask colleagues and peers what they earn. Use our survey to make this
        simpler, and less awkward.
      </p>
      <form method="POST" action="/survey">
        <div>
          <label>
            Email to receive survey link, not spam.
            <input name="email" type="email"></input>
          </label>
        </div>
        <button type="submit">Create survey</button>
      </form>
    </Fragment>
  );
};

export default CreateSurvey;
