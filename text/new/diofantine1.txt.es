\h1{ Modular linear equation of the first order }

\h2{ problem Statement }

This is an equation of the form:

$$a \cdot x = b \pmod n,$$

where $a, b, n$ --- given integers, $x$ --- unknown integer.

You want to search for a target value of $x$ lying in the interval $[0; n-1]$ (since the entire number line, clearly, there may be infinitely many solutions, which will differ each other in $n \cdot k$, where $k$ --- any integer). If the solution is not unique, we will look at how to get all the decisions.


\h2{ the Solution by finding the Inverse of an element }

Consider first the simpler case when $a$ and $n$ \bf{coprime}. Then you can find \algohref=reverse_element{return element} the number $a$, and, by multiplying on both side of the equation, get the solution (and it will be \bf{only}):

$$x = b \cdot a^{-1} \pmod n$$

Now consider the case where $a$ and $n$ \bf{coprime}. Then, obviously, the solution will not always exist (for example, $2 \cdot x = 1 \pmod 4$).

Let $g = {\rm gcd(a,n)}$, i.e. \algohref=euclid_algorithm{greatest common divisor} (which in this case is greater than one).

Then if $b$ is not divisible by $g$, then there is no solution. In fact, for any $x$ the left side of the equation, i.e. $(a \cdot x) \pmod n$ always divides $g$, while the right side is not divisible, which implies that there are no solutions.

If $b$ divides $g$, then by dividing both side of equation on $g$ (i.e., dividing $a$, $b$ and $n$ on $g$), we come to a new equation:

$$a^\prime \cdot x = b^\prime \pmod {n^\prime}$$

where $a^\prime$ and $n^\prime$ will be relatively Prime, and that's the equation we have already learned to solve. Denote the solution $x^\prime$.

Clearly, this $x^\prime$ will be written and the solution of the original equation. However, if $g > 1$, it is \bf{the only} solution. It can be shown that the original equation will have exactly $g$ solutions, and they will be:

$$x_i = (x^\prime + i \cdot n^\prime) \pmod n,$$
$$i = 0 \ldots (g-1).$$

Summarizing, we can say that \bf{number of solutions} of linear modular equations is equal to either $g = {\rm gcd(a,n)}$, or to zero.

\h2{ the Solution using the Extended Euclidean algorithm }

We will give our modular equation to diofantovy equation as follows:

$$a \cdot x + n \cdot k = b$$

where $x$ and $k$ --- unknown integers.

The way to solve this equation is described in the corresponding article \algohref=diofant_2_equation{Linear Diophantine equation of second order}, and it consists in the application \algohref=extended_euclid_algorithm{Extended Euclidean algorithm}.

There is described a process for the production of all solutions of this equation one by one the found solution, and, by the way, this way after a careful consideration of brand is equivalent to the method described in the previous paragraph.
