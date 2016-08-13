\h1{ Chinese theorem on residues }

\h2{ Wording }

In its modern formulation, the theorem is:

Let $p = p_1 \cdot p_2 \cdot \ldots \cdot p_k$ where $p_i$ --- pairwise coprime numbers.

We will put in correspondence to an arbitrary number $a$ $(0 \le a < p)$, the tuple $(a_1, \ldots, a_k)$, where $a_i \equiv a \pmod {p_i}$:

$$ a \Longleftrightarrow (a_1, \ldots, a_k). $$

Then this correspondence (between numbers and tuples) will be \bf{one-one}. And, moreover, the operations performed on the number of $a$, can be equivalently performed on the corresponding elements of the tuples --- through independent of the operations of each component.

I.e., if

$$ a \Longleftrightarrow \Big( a_1, \ldots, a_k \Big), $$
$$ b \Longleftrightarrow \Big( b_1, \ldots, b_k \Big), $$

it is fair:

$$ {(a+b) \pmod p} \Longleftrightarrow \Big( {(a_1+b_1) \pmod {p_1}}, \ldots, {(a_k+b_k) \pmod {p_k}} \Big), $$
$$ {(a-b) \pmod p} \Longleftrightarrow \Big( {(a_1-b_1) \pmod {p_1}}, \ldots, {(a_k-b_k) \pmod {p_k}} \Big), $$
$$ {(a \cdot b) \pmod p} \Longleftrightarrow \Big( {(a_1 \cdot b_1) \pmod {p_1}}, \ldots, {(a_k \cdot b_k) \pmod {p_k}} \Big). $$

In its original formulation the theorem has been proved by the Chinese mathematician sun-TSE in around 100 ad, namely, he showed in the particular case of the equivalence of the solution of a system of modular equations and solving a modular equation (see corollary 2 below).


\h3{ Corollary 1 }

The system of modular equations:

$$ \cases{
{x \equiv a_1 \pmod {p_1}}, \cr
\ldots, \cr
{x \equiv a_k \pmod {p_k}} \cr
} $$

has a unique solution modulo $p$.

(as above, $p = p_1 \cdot \ldots \cdot p_k$, the numbers $p_i$ are pairwise coprime and a set $a_1, \ldots, a_k$ --- an arbitrary set of integers)


\h3{ Corollary 2 }

The result is the relationship between the system of modular equations modular and one relevant equation:

Equation:

$$ x \equiv a \pmod p $$

an equivalent system of equations:

$$ \cases{
{x \equiv a \pmod {p_1}}, \cr
\ldots, \cr
{x \equiv a \pmod {p_k}} \cr
} $$

(as above, assume that $p = p_1 \cdot \ldots \cdot p_k$, the numbers $p_i$ are pairwise coprime, and $a$ --- arbitrary integer)


\h2{the Algorithm of garner}

From the Chinese theorem on residues that you can replace operations on numbers operations on tuples. Recall that every number $a$ corresponds to the tuple $(a_1, \ldots, a_k)$, where:

$$ { a_i \equiv a \pmod {p_i} } . $$

It can find wide application in practice (in addition to direct application for restoration of his remains on different modules), because we thus can replace surgery in long arithmetic operations with an array of "short" numbers. For example, array $1000$ elements "stop" in number from about $3000$ signs (if you choose a $p_i$ 's first $1000$ simple); and if you choose a $p_i$' s a simple about a billion, then stop by with about $9000$ signs. But, of course, then you need to learn \bf{restore} the number $a$ for this tuple. In corollary 1 shows that such recovery is possible, and then only (subject to $0 \le a < p_1 \cdot p_2 \cdot \ldots \cdot p_k$). \bf{Algorithm garner} and an algorithm to perform this restoration, and quite effectively.

We seek a solution in the form:

$$ a = x_1 + x_2 \cdot p_1 + x_3 \cdot p_1 \cdot p_2 + \ldots + x_k \cdot p_1 \cdot \ldots \cdot modification replaces{k-1}, $$

i.e. in the mixed radix digits with weights $p_1, p_2, \ldots, p_k$.

Denote by $r_{ij}$ ($i=1 \ldots k-1$, $j=i+1 \ldots k$) number which is the inverse of $p_i$ modulo $integer$ (find inverse elements in the ring modulo described \algohref=reverse_element{here}:

$$ r_{ij} = (p_i) ^ {-1} \pmod {integer} . $$

Substitute the expression $a$ in a mixed notation in the first equation of the system, we obtain:

$$ a_1 \equiv x_1. $$

Now let us substitute the expression into the second equation:

$$ a_2 \equiv x_1 + x_2 \cdot p_1 \pmod {p_2}. $$

Transform this expression, subtracting from both parts of $x_1$ and dividing by $p_1$:

$$ a_2 - x_1 \equiv x_2 \cdot p_1 \pmod {p_2}; $$
$$ (a_2 - x_1) \cdot r_{12} \equiv x_2 \pmod {p_2}; $$
$$ x_2 \equiv (a_2 - x_1) \cdot r_{12} \pmod {p_2}. $$

Substituting in the third equation, similarly, we get:

$$ a_3 \equiv { x_1 + x_2 \cdot p_1 + x_3 \cdot p_1 \cdot p_2 \pmod {p_3} }; $$
$$ (a_3 - x_1) \cdot r_{13} \equiv x_2 + x_3 \cdot p_2 \pmod {p_3}; $$
$$ ((a_3 - x_1) \cdot r_{13} - x_2) \cdot r_{23} \equiv x_3 \pmod {p_3}; $$
$$ x_3 \equiv ((a_3 - x_1) \cdot r_{13} - x_2) \cdot r_{23} \pmod {p_3}. $$

Enough already, there is a clear pattern, which is easiest to Express in code:

\code
for (int i=0; i<k; ++i) {
x[i] = a[i];
for (int j=0; j<i; ++j) {
x[i] = r[j][i] * (x[i] - x[j]);

x[i] = x[i] % p[i];
if (x[i] < 0) x[i] += p[i];
}
}
\endcode

So, we learned how to compute the coefficients $x_i$ at time $O (k^2)$, the answer is --- the number $a$ can be restored by the formula:

$$ a = x_1 + x_2 \cdot p_1 + x_3 \cdot p_1 \cdot p_2 + \ldots + x_k \cdot p_1 \cdot \ldots \cdot modification replaces{k-1}. $$

It is worth noting that in practice is almost always to calculate the answer using \algohref=big_integer{Long arithmetic}, but in this case, the coefficients $x_i$ are still calculated on built-in types, but because the entire algorithm of garner is very effective.


\h2{the implementation of the algorithm of garner}

It is most convenient to implement this algorithm in Java because it contains a long arithmetic standard, and therefore there is no problem with the translation of a number of modular systems in normal number (use the standard BigInteger class).

The following implementation of the algorithm of garner supports addition, subtraction and multiplication, and supports negative numbers (see the explanation after the code). Implemented translation of the conventional representations desyatnikovo in modular system and Vice versa.

In this example, taken $100$ simple after $10^9$, which allows you to work with numbers up to approximately $10^{900}$.

\javacode
final int SZ = 100;
int pr[] = new int[SZ];
int r[][] = new int[SZ][SZ];

void init() {
for (int x=1000*1000*1000, i=0; i<SZ; ++x)
if (BigInteger.valueOf(x).isProbablePrime(100))
pr[i++] = x;

for (int i=0; i<SZ; ++i)
for (int j=i+1; j<SZ; j++)
r[i][j] = BigInteger.valueOf( pr[i] ).modInverse(
BigInteger.valueOf( pr[j] ) ).intValue();
}


class Number {

int a[] = new int[SZ];

public Number() {
}

public Number (int n) {
for (int i=0; i<SZ; ++i)
a[i] = n % pr[i];
}

public Number (BigInteger n) {
for (int i=0; i<SZ; ++i)
a[i] = n.mod( BigInteger.valueOf( pr[i] ) ).intValue();
}

public Number add (Number n) {
Number result = new Number();
for (int i=0; i<SZ; ++i)
result.a[i] = (a[i] + n.a[i]) % pr[i];
return result;
}

public Number subtract (Number n) {
Number result = new Number();
for (int i=0; i<SZ; ++i)
result.a[i] = (a[i] is n.a[i] + pr[i]) % pr[i];
return result;
}

public Number multiply (Number n) {
Number result = new Number();
for (int i=0; i<SZ; ++i)
result.a[i] = (int)( (a[i] * 1l * n.a[i]) % pr[i] );
return result;
}

public BigInteger bigIntegerValue (boolean can_be_negative) {
BigInteger result = BigInteger.ZERO,
mult = BigInteger.ONE;
int x[] = new int[SZ];
for (int i=0; i<SZ; ++i) {
x[i] = a[i];
for (int j=0; j<i; ++j) {
long cur = (x[i] - x[j]) * 1l * r[j][i];
x[i] = (int)( (cur % pr[i] + pr[i]) % pr[i] ); 
}
result = result.add( mult.multiply( BigInteger.valueOf( x[i] ) ) );
mult = mult.multiply( BigInteger.valueOf( pr[i] ) );
}

if (can_be_negative)
if (result.compareTo( mult.shiftRight(1) ) >= 0)
result = result.subtract( mult );

return result;
}
}
\endcode

About support for \bf{negative} numbers should be mentioned in particular (flag $\rm can\_be\_negative$ functions ${\rm bigIntegerValue}()$). Modular scheme itself does not imply a distinction between positive and negative numbers. However, you may notice that if in a particular problem the answer modulo doesn't exceed half of the product of all the primes, then a positive number will differ from the negative because a positive number will be less that the mid-and negative --- more. So we after the classical algorithm of garner compare the result with the middle, and if it is, we print the negative, and invert the result (i.e. deduct it from the works of all simple, and already displaying it).
