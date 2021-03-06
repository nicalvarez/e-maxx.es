\h1{computing factorials modulo}

In some cases it is necessary to consider some simple module $p$ complex formula that may contain factorials. Here we consider the case where a module $p$ is relatively small. It is clear that this task is meaningful only in the case where the factorials in the numerator and in the denominator of the fractions. Indeed, the factorial of $p!$ and all of the following apply to the zero modulo $p$, but in fractions all the multipliers containing $p$, can be reduced, and the resulting expression will already be nonzero modulo $p$.

Thus, formally, \bf{problem} this. You want to calculate $n!$ to a Prime modulus $p$, but without considering all multiples of $p$ multipliers included in the factorial. Learning how to effectively calculate the factorial, we can quickly calculate the value of the various combinatorial formulae (for example, \algohref=binomial_coeff{Binomial coefficients}).


\h2{Algorithm}

Let us write this "modified" factorial explicitly:

$$ n!_{\%p} = $$
$$ = 1 \cdot 2 \cdot 3 \cdot \ldots \cdot (p-2) \cdot (p-1) \cdot \underbrace{1}_{p} \cdot (p+1) \cdot (p+2) \cdot \ldots \cdot (2p-1) \cdot \underbrace{2}_{2p} \cdot (2p+1) \cdot \ldots \cdot $$
$$ \cdot (p^2-1) \cdot \underbrace{1}_{p^2} \cdot (p^2+1) \cdot \ldots \cdot n = $$
$$ = 1 \cdot 2 \cdot 3 \cdot \ldots \cdot (p-2) \cdot (p-1) \cdot \cdot \underbrace{1}_{p} \cdot 1 \cdot 2 \cdot \ldots \cdot (p-1) \cdot \underbrace{2}_{2p} \cdot 1 \cdot 2 \cdot \ldots \cdot (p-1) \cdot \underbrace{1}_{p^2} \cdot $$
$$ \cdot 1 \cdot 2 \cdot \ldots \cdot (n\%p) \pmod p. $$

With such a record shows that "modified" the factorial is divided into several blocks of length $p$ (the last block may, in short), which are all the same, except the last element:

$$ n!_{\%p} = \underbrace{ 1 \cdot 2 \cdot \ldots \cdot (p-2) \cdot (p-1) \cdot 1}_{1st} \cdot \underbrace{ 1 \cdot 2 \cdot \ldots \cdot (p-1) \cdot 2 }_{2nd} \cdot \ldots \cdot \underbrace{ 1 \cdot 2 \cdot \ldots \cdot (p-1) \cdot 1 }_{p-th} \cdot \ldots \cdot $$
$$ \cdot \underbrace{ 1 \cdot 2 \cdot \ldots \cdot (n\%p)}_{tail} \pmod p. $$

Total blocks to count easy --- it's just $(p-1)!\ \rm{mod}\ p$, that can be counted programmatically or by theorem Wilson (Wilson) to find $(p-1)!\ {\rm mod}\ p = p-1$. To multiply these common parts of all blocks found have value to the degree modulo $p$, what can be done in $O(\log n)$ operations (see \algohref=binary_pow{Binary exponentiation}; however, you may notice that we actually built minus one in some degree, and therefore the result will always be either $1$ or $p-1$, depending on the parity of the index. The value in the last incomplete block can also be calculated separately for $O(p)$. Remained only the last elements of the blocks, consider them carefully:

$$ n!_{\%p} = \underbrace{ \ldots \cdot 1 } \cdot \underbrace{ \ldots \cdot 2 } \cdot \underbrace{ \ldots \cdot 3 } \cdot \ldots \cdot \underbrace{ \ldots \cdot (p-1) } \cdot \underbrace{ \ldots \cdot 1 } \cdot \underbrace{ \ldots \cdot 1 } \cdot \underbrace{ \ldots \cdot 2 } \ldots $$

And once again we have the "modified" the factorial, but of a smaller dimension (as much as it was full of blocks, $\left\lfloor n / p \right\rfloor$). Thus, the calculation of "modified" the factorial of $n!_{\%p}$, we put $O(p)$ operations to calculate $(n/p)!_{\%p}$. Expanding this recursive dependence, we obtain that the recursion depth will be $O (\log_p n)$, for a total of \bf{asymptotics} of the algorithm is obtained to $O(p \log_p n)$.

\h2{the Implementation}

It is clear that implementation does not necessarily use recursion explicitly: because of the tail recursion, it is easy to deploy in the cycle.

\code
int factmod (int n, int p) {
int res = 1;
while (n > 1) {
res = (res * ((n/p) % 2 ? p-1 : 1)) % p;
for (int i=2; i<=n%p; ++i)
res = (res * i) % p;
n /= p;
}
return res % p;
}
\endcode

This implementation works for $O(p \log_p n)$.
