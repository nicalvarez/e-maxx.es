\h1{ balanced Ternary numeral system }

Balanced ternary notation is non-standard positional numeral system. The system base is equal to $3$, however, it differs from the usual ternary system, the digits are $-1, 0, 1$. Because use a $-1$ for one number is very uncomfortable, it usually takes some kind of special designation. Here we agree to denote minus one letter $z$.

For example, the number $5$ in the balanced ternary system is written as $1zz$ and the number $-5$ - - - $z11$. Balanced ternary notation allows to write negative numbers without writing a separate minus sign. Ternary balanced system allows fractional numbers (for example, $1/3$ is written as $0.1$).

\h2{ Algorithm }

Learn to translate numbers in balanced ternary system.

For this we must first translate the number into trinary system.

It is clear that now we need to get rid of the numbers $2$, note that $2 = 3 - 1$, i.e. we can replace the two in this category by $-1$, all while making next (i.e. to the left of it in natural records) category $1$. If we move on right-to-left and perform the above operation (in some bits of overflow can occur more than $3$, in this case, of course, "dropped" superfluous triples in senior category), we come to the ternary balanced recording. As you can see, the same rule is true for fractional numbers.

More gracefully the above procedure can be described as follows. We take the number in the ternary number system, we add to it an infinite number of $\ldots 11111.11111 \ldots$, then each digit from the result, subtract one (without any hyphens).

Knowing now the translation algorithm from an ordinary ternary system in a balanced, easily you can implement the operations of addition, subtraction and division -is - simply reducing them to the corresponding operations on unbalanced ternary numbers.
