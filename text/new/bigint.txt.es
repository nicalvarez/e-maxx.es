\h1{ Long arithmetic }

Long arithmetic is a set of software tools (data structures and algorithms) that allow you to work with numbers much larger than standard data types.


\h2{ Types of long integer arithmetic }

Generally speaking, even only in the Olympiad tasks the Toolkit is quite large so will make a classification of different types of long arithmetic.


\h3{ Classic long arithmetic }

The basic idea is that the number is stored as an array of its digits.

The figures can be used in the different number systems generally use the decimal notation and its extent (ten thousand billion), or binary number system.

Operations on numbers in this form long arithmetic can be made using a "school" algorithms for addition, subtraction, multiplication, division by a whisker. However, they also apply algorithms for fast multiplication: \algohref=fft_multiply{Fast Fourier transform} Algorithm and Karatsuba.

Described here work only with non-negative long integers. To support negative numbers you need to enter and maintain additional flag of "negativity", or to work in complementary codes.


\h4{ data Structure }

Store long the number will be in the form of a vector of numbers $int$, where each element is one digit numbers.

\code
typedef vector<int> lnum;
\endcode

To improve effectiveness we will work in the system on the basis of a billion, ie every element of the vector $lnum$ contains not one, but the $9$ digits:

\code
const int base = 1000*1000*1000;
\endcode

The numbers will be stored in the vector in such a manner that first the least significant digits (i.e. units, tens, hundreds, etc.).

In addition, all operations will be implemented in such a way that after performing any of them have leading zeros (i.e. excess zeros at the beginning of the number) missing (of course, assuming before each operation leading zeros are also not available). It should be noted that in the presented implementation for the number zero correctly supported by two representations: an empty vector numbers, and vector numbers containing a single item --- zero.


\h4{ Conclusion }

The simplest is the output of long numbers.

First, we simply output the last element of the vector (or $0$ if the vector is empty), and then output all remaining elements of the vector, padding it with zeroes to $9$ symbols:

\code
printf ("%d", a.empty() ? 0 : a.back());
for (int i=(int)a.size()-2; i>=0; --i)
printf ("%09d", a[i]);
\endcode

(here is a small subtle point: we must not forget to record the conversion of type $(int)$ since otherwise the number of $a.size()$ will be unsigned, and if $a.size() \le 1$, then subtracting an overflow will occur)


\h4{ Read }

Reading a string in $string$, and then convert it into a vector:

\code
for (int i=(int)s.length(); i>0; i-=9)
if (i < 9)
a.push_back (atoi (s.substr (0, i).c_str()));
else
a.push_back (atoi (s.substr (i-9, 9).c_str()));
\endcode

If you use instead of $string$ file $char$'s, then the code will be even more compact:

\code
for (int i=(int)strlen(s); i>0; i-=9) {
s[i] = 0;
a.push_back (atoi (i>=9 ? s+i-9 : s));
}
\endcode

If the input number can be leading zeroes, after reading, you can delete this way:

\code
while (a.size() > 1 && a.back() == 0)
a.pop_back();
\endcode


\h4{ Addition }

Adds to the number $a$ the number $b$ and stores the result in $a$:

\code
int carry = 0;
for (size_t i=0; i<max(a.size(),b.size()) || carry; ++i) {
if (i == a.size())
a.push_back (0);
a[i] += carry + (i < b.size() ? b[i] : 0);
carry = a[i] >= base;
if (carry) a[i] -= base;
}
\endcode


\h4{ Subtraction }

Takes away from the number $a$ the number $b$ ($a \ge b$), and stores the result in $a$:

\code
int carry = 0;
for (size_t i=0; i<b.size() || carry; ++i) {
a[i] -= carry + (i < b.size() ? b[i] : 0);
carry = a[i] < 0;
if (carry) a[i] += base;
}
while (a.size() > 1 && a.back() == 0)
a.pop_back();
\endcode

Here we perform subtraction removed leading zeroes to support the predicate that they do not exist.


\h4{ Multiplication long to short }

Long multiplies $a$ short $b$ ($b < {\rm base}$) and stores the result in $a$:

\code
int carry = 0;
for (size_t i=0; i<a.size() || carry; ++i) {
if (i == a.size())
a.push_back (0);
long long cur = carry + a[i] * 1ll * b;
a[i] = int (cur % base);
carry = int (cur / base);
}
while (a.size() > 1 && a.back() == 0)
a.pop_back();
\endcode

Here we are after the division removed leading zeroes to support the predicate that they do not exist.

(Note: method \bf{further optimizations}. If speed work is extremely important, you can try to replace two division one is to count only the integer part from the division (in this code the variable $carry$), and then calculate the modulus (using a single multiplication operation). Typically, this technique allows faster code, although not very much.)


\h4{ Multiplication of two long integers }

Multiplies $a$ by $b$ and stores the result in $c$:

\code
c lnum (a.size()+b.size());
for (size_t i=0; i<a.size(); ++i)
for (int j=0, carry=0; j<(int)b.size() || carry; ++j) {
long long cur = c[i+j] + a[i] * 1ll * (j < (int)b.size() ? b[j] : 0) + carry;
c[i+j] = int (cur % base);
carry = int (cur / base);
}
while (c.size() > 1 && c.back() == 0)
c.pop_back();
\endcode


\h4{ long Division to short }

Long divides $a$ short $b$ ($b < {\rm base}$), private stores in $a$, the remainder $carry$:

\code
int carry = 0;
for (int i=(int)a.size()-1; i>=0; --i) {
long long cur = a[i] + carry * 1ll * base;
a[i] = int (cur / b);
carry = int (cur % b);
}
while (a.size() > 1 && a.back() == 0)
a.pop_back();
\endcode


\h3{ Long arithmetics in the factored form }

Here, the idea is to store the number, and its factorization, i.e., the degree of each incoming it simple.

This method is also very simple to implement, and it is very easy to perform operations of multiplication and division, however, make it impossible to add or subtract. On the other hand, this method significantly saves memory in comparison with the "classical" approach, and lets you make multiplication and division much (asymptotically) faster.

This method is often used when it is necessary to make the division through a difficult module: then it is enough to store a number in the form of degrees on common divisors of the module, and another number --- balance on the same module.


\h3{ Long arithmetic system of simple modules (Chinese theorem or schema garner) }

The point is that you select some of the system modules (usually small, fits in standard data types), and the number is stored as a vector of residues from dividing each of these modules.

According to the Chinese theorem on residues, this is sufficient to uniquely store any number in the range from 0 to the product of these modules minus one. There \algohref=chinese_theorem{the Algorithm of garner}, which allows it to restore from a modular form in the usual "classical" form of the number.

Thus, this method saves memory compared to "classic" long arithmetics (although in some cases not so radically, as a method of factorization). The chrome is also in modular form, one can perform addition, subtraction and multiplication, --- all at the same time asymptotically proportional to the number of modules in the system.

But all this comes at the price of a laborious translation of a number of this modular form in normal view, which, in addition to considerable time costs, you will also need the implementation of the "classic" long arithmetic with multiplication.

In addition, to produce \bf{division} of numbers in this representation, the system of simple modules is not possible.


\h2{ Types of long fractional arithmetic }

Operations on fractional numbers occur in Olympiad problems are much less, and to work with very large fractional numbers is much more difficult, so in Olympiads appears only on a specific subset of long fractional arithmetic.


\h3{ Long arithmetic in irreducible fractions }

Number is represented as an irreducible fraction $\frac{a}{b}$, where $a$ and $b$ is just a number. Then all operations on fractional numbers it is easy to reduce to operations on the numerators and denominators of these fractions.

Generally, to store the numerator and denominator also has to use long arithmetic, but perhaps the easiest form of-- "classic" long arithmetic, although sometimes it is enough built-in 64-bit numeric type.


\h3{ position Selection floating point in a separate type }

Sometimes the problem is to make calculations with very large or very small numbers, but it does not prevent overows. Built-in $8-10$-byte type $double$, as you know, allow exponent values in the range $[-308; 308]$, which sometimes may not be enough.

The reception, in fact, very simple --- enter another integer variable that is responsible for the exponent, and after each operation, the fractional number of "normalized," i.e., returns in the interval $[0.1; 1)$, by increasing or decreasing the exponent.

When multiplying or dividing two such numbers should be folded or subtract their exponents. When you add or subtract before performing this operation should lead to the same exponent, for which one of them is multiplied by $10$ in the degree of difference of the exponents.

Finally, it is clear that it is not necessary to choose $10$ as the base of the exponent. Based on the device's built-in types float, the most favorable appear to be laying the Foundation equal to $2$.
