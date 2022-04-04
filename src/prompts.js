module.exports = [
  {
    type: 'input',
    name: 'name',
    default: 'backend',
    message: "What's your project name ? (This will be the project folder)",
    validate: function (value) {
      if (value.match(/^[_A-z0-9@]*((-|_)*[_A-z0-9@])*$/)) return true;
      return 'Please enter a valid project name';
    },
  },
];
