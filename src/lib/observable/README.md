# Observables

An observer is an object that can have the methods `next`/`complete`/`error`.

An Observable constructor accepts a function that glues a data source and the observer together, this function is called a subscriber. The subscriber function accepts a observer object argument. The logic behind calling the `next`/`complete`/`error` methods of the observer is handled within the subscriber function.
The subscribe method of an observable takes an observable as argument, that observable is passed to the subscriber function. A unscubscribe function is returned.

