### Chapter 1 - Validity : What Follows from What?

Definitions of inferences, premises, conclusions.
Distinction between deductively valid and inductively valid.
An inference is deductively valid if there are no situations in which the premises are true and the conclusion is not.

### Chapter 2 - Truth Functions - or Not?

Some valid inferences are intuitive : ```She's a woman and a banker, therefore she's a banker``` Other aren't : ```I'm rich and I am not rich, therefore pigs can fly```.
Definitions of truth tables.
A situation determines each relevant sentences to be either true or false. Given a situation, we can calculate the truth value of complex sentences with truth tables. Example : in the situation where P is true, Q is false and R is true, the truth value of P ∧ (¬RvQ) is false.
Let's take the inference QvP,¬Q/P, there are 4 situations possibles, and in all four of them, there is no case in which both QvP and ¬Q (the premisses) are true and P (the conclusion) is false, so the inference is valid.

P | Q | QvP | ¬Q | P
--|---|----|---|---
T | T | T | F | T
T | F | T | T | T
F | T | T | F | F
F | F | F | T | F

Same with the Q,¬Q/P. There are no situation in which both the premisses are true (since they are in contradiction), so no matter the conclusion, it's valid. Some logicians say it's "vacuously valid", to highlight that the premisses could never be true together.

P | Q | ¬Q | P
--|---|----|---
T | T | F | T
T | F | T | T
F | T | F | F
F | F | T | F


### Chapter 3 - Name and Quantifiers : Is Nothing Something?

Some phrases are ambiguous ("Someone hit me", "Nobody came to my party"). Graham introduces quantifiers and objects.
The sentence nP is true in a situation if the object referred to by n has the property expressed by P in that situation.
Particular quantifier : ∃, Universal quantifier : ∀.
Cosmological argument for god : everything has a cause, but what is the cause of everything? It can't be something physical like the Big Bang. Such things must themselves have causes. It has to be something metaphysical. God is the obvious candidate.
Problem : "Everything has a cause" is ambiguous. It can mean that every single things that happens has a cause (1), or it can mean that there is a single thing which is the cause of everything (2).
Let's write "x is caused by y" as xCy.
```
1 : ∀x ∃y xCy
2 : ∃y ∀x xCy
```
The first follows from the second but not the other way around.
Another problem : either the cosmos stretches back infinitively into the past (1), or it came into existence at a certain point out of nothing (2).
Let c be the cosmos and "x came into existence out of y" as xEy. Then "The cosmos came into existence out of nothing" = "¬∃x cEx". But this is equally true in (1), since in (1) the cosmos never "came into existence".
The word "noghing" in (2) means "nothingness", so nothing can be a thing after all.

### Chapter 4 - Descriptions and Existence : Did the Greeks Worship Zeus?

Introducing definite descriptions : |x = "the object x, such that". Example : "The man who first landed on the Moon" = |x(xM ∧ xF), where M = "is a man" and F = "landed first on the Moon".
Descriptions are subjects/names and not quantifiers. They can have properties. "The man who first landed on the Moon was born in the USA" = |x(xM ∧ xF)U, where U = "was born in the USA".
Some descriptions fail to refer to anything : "The person who married the Pope", since the Pope in unmarried, or "The city in Australia which has more than a million people", because there are several of them.
Problem : if "The most powerful of the ancient Greek gods" doesn't refer to anything, then it was false that the Greeks worshiped Zeus. Quote :

>To put it tendentiously there are truths about non-existent objects, after all.

### Chapter 5 - Self-Reference : What is this Chapter About?

Problematic case of self-reference : "This sentence is false", it seems to be both true and false.
Another : "This sentence is true", it seems to be neither true nor false.
Solution : sentences can be true, false, both or neither. [to complete with truth tables of all cases]
Given this kind of logic, ```Q,¬Q/P``` and ```QvP,¬Q/P``` are both invalid.

### Chapter 6 - Necessity and Possibility : What Will be Must be?

Introducing modal operators. ◻a = "a must be true", ◇a = "a could be true". ◻a = -◇-a and ◇a = -◻-a.
They are not truth functions like ∧, - and v, we can't infer the truth value of ◇a or ◻a from the truth value of a.
[Complete the chapter with screenshots]
Aristotle's argument for fatalism :
```
P = "I will be involved in an accident tomorrow"
We don't know yet if it's true, but we know I will be either in an accident or not.
Suppose the first, then P is true, and if it is true to say that P, then it cannot fail to be the case that P.
Suppose the second, then P is false, therefore it cannot be the case that P is true.
```
A situation S comes with a bunch of possibilities, which are situations possibles as far as S goes. The set of these situations are called "possible worlds".
Example : if all possible worlds are S and S', such as S={a : F, b : F} and S'={a : T, b : F}, then ◇a is true, but ◇b is false.
Introducing conditionals : "if P then Q" = P→Q
Modus ponens : ```P,P→Q/Q```
We can't deduce P→◻Q from ◻(P→Q), and that's why Aristotle's argument is invalid.
Another argument for fatalism : if P is in the past, then P→◻P since we can't change the past. If P = "Jeff will be involved in an accident tomorrow" and P is true, then in 100 years P will be true.

### Chapter 7 - Conditionals : What's in an if?

Vocabulary : In ```P→Q``` P is the antedecent, Q is the consequent.
Conditionals are not truth functions. P→Q is true in some situation, s, just if Q is true in every one of the possible situations associated with s in which Q is true.
A→B,B→C/A→C is a valid inference. Problem : "If Smith dies before the election, Jones win. If Jones wins, Smith will retire. So if Smith dies before the election, he will retire" doesn't seems to be valid, conditionals can be confusing.

### Chapter 8 - The Future and the Past : Is Time Real?

Introducing tense operators : Ps = "it was the case that s", Fs = "it will be the case that s". They are not truth functions and they can be iterated, example : FPs = "It will be the case that it was the case that s". These iterations are called "compound tenses" (modal operators can be iterated too).
[Insert McTaggart's argument]
For a situation S0, we have S1, S2 etc... as future situation and S-1, S-2 etc... as past situations.
New tense operators : Ga is true in a situation S if a is true in all situations to the right of S (ie "it is always going to be the case that a"). Ha is true in a situation S if a is true in all situations to the left of S (ie "it has always being the case that a").
[Insert refutation of McTaggart's argument]

### Chapter 9 - Identity and Change : Is Anything Ever the Same?

Logicians differentiate between the "is" of predication, which describes properties ("the table is red") and the "is" of identity, which identify ("I am Graham Priest", "The person who won the race is the same person who won it last year").
Syntax : "John is red" = "jR" (see chapter 3), "John is the person who won the race" = "j = w" (sentences like these are called identities).
Example of a valid inference with it : j = w, wP/jP.
Leibniz's law : for any object, x and y, if x = y, thenx has any properties that y have and vice-versa.
Problem : "John is the person who won the race, Mary knows that the person who won the race has got a prize/Mary knows John got a prize". What if Mary doesn't know that John is the winner? Solution : "knowing x won the race" is a property of Mary, not of x.
Bigger problem : x = y, G x = x/G x = y (if two things are identical, they will always be identical)

### Chapter 10 - Vagueness : How do you Stop Sliding down a Slippery Slope?

Problem : if one is a child at t, then one is a child at t + 1 second, and so on... even at 25 years!
Introducing fuzzy logic : 1 is complete truth, 0 is complete falsity.

```
|¬a| = 1 - |a|
|a∧b| = Min(|a|, |b|)
|aVb| = Max(|a|, |b|)
```
For a number x (level of acceptability), an inference is valid if the conclusion has a value at least as great as x in every situation where the premisses all have values at least as great as x.

### Chapter 11 - Probability : The Strange Case of the Missing Reference Class

Introducing inductively valid inferences : an inference in which the premisses (p) makes the conclusion (c) more probable than not. Which means : p(c|p) > p(-c|p).
Problem of references classes.

### Chapter 12 - Inverse Probability : You can't be Indifferent About it! [to complete]

Very famous inductive inference : the cosmos is ordered in a very structured way which makes life possible, it is a reason to believe in the existence of a creator (argument from design).
Inverse probabilities : ```p(a|b) = p(b|a) * p(a) / p(b)```
Given a number of possibilities, with no relevant difference between them, they all have the same probability (Principle of Indifference)

### Chapter 13 - Decision Theory : Great Expectations

Recapitulation of the Pascal's wager.
Introducting Expectation in the mathematical sense.
Obvious problem of the wager : several possible gods.
Devil toss coin.
