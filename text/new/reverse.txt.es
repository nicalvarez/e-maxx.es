
\h1{ Inverse element in the ring modulo }


\h2{ Definition }

Assume some natural module $m$, and consider the ring generated by this module (i.e. composed of numbers from $0$ to $m-1$). Then for some elements of this ring can be found \bf{return element}.

The inverse of the number $a$ modulo $m$ is the number $b$ that:

$$ a \cdot b \equiv 1 \pmod m, $$

and it is often denote by $a^{-1}$.

It is clear that for the zero return of the item does not exist ever; for the rest of the elements return as may exist or not. It is alleged that the inverse exists only for those elements $a$ \bf{coprime} to the module $m$.

Consider the following two ways of finding the inverse of an element employed, provided that it exists.

In conclusion, consider an algorithm that allows to find the inverse all the numbers by a certain module in linear time.


\h2{ Finding using the Extended Euclidean algorithm }

Consider the auxiliary equation (in the unknown $x$ and $y$):

$$ a \cdot x + m \cdot y = 1. $$

It \algohref=diofant_2_equation{linear Diophantine equation of second order}. As shown in the relevant article, from the condition ${\rm gcd}(a,m)=1$, it follows that this equation has a solution which can be found using \algohref=extended_euclid_algorithm{Extended Euclidean algorithm} (hence, incidentally, it follows that when ${\rm gcd}(a,m) \ne 1$, the solutions, and therefore the inverse element does not exist).

On the other hand, if we take from both parts of the equation, the remainder modulo $m$, we get:

$$ a \cdot x = 1 \pmod m. $$

Thus, it was found $x$ will be the inverse of $a$.

Implementation (given the fact that the found $x$ we need to take modulo $m$, and $x$ could be negative):

\code
int x, y;
int g = gcdex (a, m, x, y);
if (g != 1)
cout << "no solution";
else {
x = (x % m + m) % m;
cout << x;
}
\endcode

Asymptotics of this solution is obtained to $O (\log m)$.


\h2{ Finding using Binary exponentiation }

Let's use Euler's theorem:

$$ a ^ {\phi(m)} \equiv 1 \pmod m, $$

which is correct just for the case of coprime $a$ and $m$.

Incidentally, in the case of a simple module $m$ we get an even more simple statement --- the small Fermat's theorem:

$$ a^{m-1} \equiv 1 \pmod m. $$

Multiply both parts of each equation by $a^{-1}$, we obtain:

\ul{

\li for any module $m$:

$$ a^{\phi(m)-1} \equiv a^{-1} \pmod m, $$

\li for a simple module $m$:

$$ a^{m-2} \equiv a^{-1} \pmod m. $$

}

Thus, we have obtained the formula for direct calculation is reversed. For practical applications normally use the effective \algohref=binary_pow{algorithm binary exponentiation}, which in our case would allow exponentiation for $O (\log m)$.

This method is somewhat simpler as described in the preceding paragraph, however, it requires knowledge of the values of the Euler function that actually requires the factorization of the modulus $m$, which can sometimes be quite a daunting task.

If the factorization of numbers is known, then this method also works for complexity $O (\log m)$.


\h2{ Finding all the primes modulo in linear time }

Suppose given a simple module $m$. Required for each number in the interval $[1; m-1]$ to find the inverse to it.

Applying the above algorithms, we get only solutions with the asymptotic behavior of $O (m \log m)$. Here we show a simple solution with the asymptotic behavior of $O (m)$.

\bf{Solution} this is as follows. Denote by $r[i]$ is the required inverse to $i$ modulo $m$. Then for $i > 1$ true identity:

$$ r[i] = - \left\lfloor \frac{m}{i} \right\rfloor \cdot r[m {\rm~mod~} i]. \pmod m $$

\bf{Implementation} in this surprisingly concise solution:

\code
r[1] = 1;
for (int i=2; i<m; ++i)
r[i] = (m - (m/i) * r[m%i] % m) % m;
\endcode

\bf{Proof} this solution is a chain of simple transformations:

Write the value of $m {\rm~mod~} i$:

$$ m {\rm~mod~} i = m - \left\lfloor \frac{m}{i} \right\rfloor \cdot i, $$

whence, taking both parts of the module $m$, we get:

$$ m {\rm~mod~} i = - \left\lfloor \frac{m}{i} \right\rfloor \cdot i. \pmod m $$

Multiplying both sides by inverse of $i$ and inverse of $(m {\rm~mod~} i)$, we find the required formula:

$$ r[i] = - \left\lfloor \frac{m}{i} \right\rfloor \cdot r[m {\rm~mod~} i], \pmod m $$

what we wanted to prove.
