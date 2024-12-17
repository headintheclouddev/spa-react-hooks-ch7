import { jsx as _jsx } from "@uif-js/core/jsx-runtime";
import App from './App';
// import query from 'N/query';
export function run(context) {
    console.log('SpaClient version 241213a - run', context);
    debugger;
    context.setLayout('application'); // Make the application fill the entire viewport
    // query.runSuiteQL.promise({ query: `SELECT entityid FROM customer WHERE id = 1649` }).then((resultSet) => {
    //   const results: { entityid: string }[] = resultSet.asMappedResults() as any;
    //   const app = <HelloWorld customerName={results[0].entityid} />;
    //   context.setContent(app);
    // });
    context.setContent(_jsx(App, {}));
}
