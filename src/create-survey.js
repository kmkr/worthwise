import { Fragment, h } from "preact";

const CreateSurvey = () => {
  return (
    <Fragment>
      <form method="POST" action="/survey">
        <button type="submit">Create survey</button>
      </form>
    </Fragment>
  );
};

export default CreateSurvey;
