// this solution assumes ECMAScript 2015 is supported
const isValidLisp = (str) => {
  // keep track of each new open parenthesis using a stack, removing open parentheses from the stack once a valid pair is found
  const openParentheses = [];
  for (const character of str) {
	if (character === '(') {
	  openParentheses.push(character);
	} else if (character === ')') {
	  if (openParentheses.length > 0) {
		// remove the corresponding open parenthesis from the stack since we have a valid pair
		openParentheses.pop();
	  } else {
		// this closing parenthesis doesn't match with a corresponding open parenthesis -- the LISP is invalid
		return false;
	  }
	}
  }
  // the LISP is invalid if any unclosed open parentheses exist
  return openParentheses.length === 0;
};

const testInputs = (inputs) => {
	inputs.forEach(input => console.log(`Is \n\n${input} \n\nvalid LISP?: ${isValidLisp(input)}\n\n`));
};

// test valid LISP
testInputs([
  `(defun factorial (n)
	(loop for i from 1 to n
		for fac = 1 then (* fac i)
		finally (return fac)))`,
  `(defun factorial (n)
	(if (zerop n) 1
		(* n (factorial (1- n)))))`,
  `(if nil
	 (list 1 2 "foo")
	 (list 3 4 "bar"))`
]);

// test invalid LISP
testInputs([
`(defun factorial (n)
	(loop for i from 1 to n
		for fac = 1 then (* fac i)(
		finally (return fac)))`,
  `(defun factorial) (n)
	(if (zerop n) 1
		(* n (factorial (1- n)))))`,
  `)(if nil
	 (list 1 2 "foo")
	 (list 3 4 "bar")`
]);