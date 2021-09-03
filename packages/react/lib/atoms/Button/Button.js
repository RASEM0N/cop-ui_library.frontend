import { jsx } from 'react/jsx-runtime';

const Button = ({ label }) => {
    return jsx("button", Object.assign({ className: "cop-ui-button__container" }, { children: label }), void 0);
};

export { Button as default };
//# sourceMappingURL=Button.js.map
