\h1{ Finding the degree of the divisor of the factorial }

Given two numbers $n$ and $k$. You need to calculate, what is the degree of the divisor $k$ is among the $n!$, i.e. to find the largest $x$ such that $n!$ is divided into $k^x$.


\h2{ a Solution for the case of simple $k$ }

Consider first the case when $k$ is simple.

Let us write the expression for the factorial explicitly:

$$ n! = 1\ 2\ 3\ \ldots\ (n-1)\ n $$

Note that every $k$-th member of this work is divided into $k$, i.e. gives +1 to the answer; the number of such members equals $\lfloor n/k \rfloor$.

Further, observe that every $k^2$-th member of this series is divided into $k^2$, i.e. gives another +1 to the answer (given that $k$ of degree has already been considered before); the number of such members equals $\lfloor n/k^2 \rfloor$.

And so on, each $k^i$-th term of the series gives a +1 to the answer, and the number of such members equals $\lfloor n/k^i \rfloor$.

Thus, the answer is equal to the value of:
$$ \frac{n}{k} + \frac{n}{k^2} + \ldots + \frac{n}{k^i} + \ldots $$

This amount, of course, not infinite, because only about the first $\log_k n$ members different from zero. Therefore, the asymptotic behavior of this algorithm is $O(\log_k n)$.

Implementation:

\code
int fact_pow (int n, int k) {
int res = 0;
while (n) {
n /= k;
res += n;
}
return res;
}
\endcode


\h2{ a Solution for the case of composite $k$ }

The same idea apply here directly anymore.

But we can factor out $k$, solve the problem for each simple divider, and then choose the minimum of the answers.

More formally, let $k_i$ is $i$-th divisor of $k$, enters it in the degree of $p_i$. Let's solve the problem for $k_i$ by using the above formula for $O (\log n)$; suppose we get the answer ${\rm Ans}_i$. Then the answer for integral $k$ is the minimum of the values ${\rm Ans}_i / p_i$.

Given that the factorization of the simplest way is performed in $O (\sqrt{k})$, we obtain the final asymptotic $O (\sqrt{k})$.
