\h1 {- Enumeration of all captured substrings of the mask }


\h2{ the Enumeration of captured substrings of a fixed mask }

Given a bitmask of $m$. Effectively required to iterate over all its subpatterns, i.e. such masks $s$ in which can be included only those bits that were included in the mask $m$.

Immediately consider the implementation of this algorithm, based on tricks with bitwise operations:

\code
int s = m;
while (s > 0) {
... you can use s ...
s = (s-1) & m;
}
\endcode

or, using a more compact operator $for$:

\code
for (int s=m; s; s=(s-1)&m)
... you can use s ...
\endcode

The only exception for both variants of the code --- subpattern of zero will not be processed. Its processing should be taken out of the loop, or use a less elegant design, for example:

\code
for (int s=m; ; s=(s-1)&m) {
... you can use s ...
if (s==0) break;
}
\endcode

Take a look at why the above code actually finds all of the subpatterns of the mask, and without repetition, O (their number), and in descending order.

Suppose we have current subpattern $s$, and we want to move on to the next subpattern. Subtract from the mask $s$ the unit, thus we will remove the rightmost set bit and all bits to the right of him to put in $1$. Then remove all the "extra" bits that are not included in the mask $m$ and therefore can't enter the submask. The delete bit operation $\& m$. As a result, we "cut" mask $s-1$ to the largest value it can take, i.e. until the next subpatterns after $s$ in descending order.

Thus, this algorithm generates all subpatterns of the mask in the order of strictly decreasing, spending on each transition to two elementary operations.

Especially consider the time when $s = 0$. After running $s-1$, we get a mask where all bits are enabled (bit representation of the number of $-1$), and after removing the superfluous bits of the operation $(s-1) \& m$ get nothing, as the mask $m$. So with mask $s = 0$ should be careful --- if time does not stop on the zero mask, the algorithm may enter an infinite loop.


\h2{ the Enumeration of all the masks with their subpatterns. Evaluating $3^n$ }

In many problems, especially on dynamic programming by masks, I want to iterate over all masks and for each mask, all the subpatterns:

\code
for (int m=0; m<(1<<n); ++m)
for (int s=m; s; s=(s-1)&m)
using ... s and m ...
\endcode

Let us prove that the inner loop will execute a total of $O (3^n)$ iterations.

\bf{Proof: 1 method}. Consider the $i$-th bit. For him, generally speaking, there are exactly three options: not included in the mask $m$ (because the subpattern in $s$); it is included in $m$ but not in $s$; it is included in $m$ and $s$. Just bits of $n$, so different combinations will be $3^n$, what we wanted to prove.

\bf{Proof: 2 way}. Note that if the mask $m$ has $k$ bits included, it will have $2^k$ subpatterns too. Because masks of length $n$ with $k$ bits are included there are $C_n^k$ (see \algohref=binomial_coeff{"binomial coefficients"}), then all combinations will be:

$$ \sum_{k=0}^n C_n^k 2^k. $$

Calculate this amount. To this end, note that it is not that other, as the decomposition of the Newton binomial expression $(1+2)^n$, i.e. $3^n$, what we wanted to prove.
