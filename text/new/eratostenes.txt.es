\h1{ Sieve of Eratosthenes }

The sieve of Eratosthenes is an algorithm to find all Prime numbers in the interval $[1; n]$ for $O (n \log \log n)$ operations.

The idea is simple --- write the number of numbers $1 \ldots n$, and we will strike first, all the numbers divisible by $2$, except the number $2$, then delamina $3$, except the number $3$, then $5$, then $7$, $11$, and all other simple to $n$.


\h2{ the Implementation }

Right here is an implementation of the algorithm:

\code
int n;
vector<char> prime (n+1, true);
prime[0] = prime[1] = false;
for (int i=2; i<=n; ++i)
if (prime[i])
if (i * 1ll * i <= n)
for (int j=i*i; j<=n; j+=i)
prime[j] = false;
\endcode

This code first checks all numbers except zero and one, as simple, and then begins the process of screening of compound numbers. To do this, we iterate in a loop all numbers from $2$ to $n$, and if the current number $i$ is Prime then mark all multiples of him, as a constituent.

When we begin to go from $i^2$, since all smaller multiples of $i$, must have a Prime divisor less than $i$, which means that they were already screened out earlier. (But since $i^2$ can easily overflow type $int$, in the code before the second nested loop is an additional check using the type $long~long$.)

In this implementation, the algorithm consumes $O (n)$ memory (obviously) and performs $O (n \log \log n)$ actions (this is proved in the next section).


\h2{ Asymptotics }

Let us prove that the asymptotic behavior of the algorithm is $O (n \log \log n)$.

So, for each Prime $p \le n$ will run the inner loop, which will make $\frac{n}{p}$ action. Therefore, we need to evaluate the following value:

$$ \sum_{ \scriptstyle p \le n \atop\scriptstyle p~is~prime } \frac{n}{p} = n \cdot \sum_{ \scriptstyle p \le n \atop\scriptstyle p~is~prime } \frac{1}{p}. $$

Recall here two known facts: that a number is Prime is less than or equal to $n$ is approximately $\frac{n}{\ln n}$ and that $k$-th Prime number is approximately equal to $k \ln k$ (this follows from the first assertion). Then the sum can be written thus:

$$ \sum_{ \scriptstyle p \le n \atop\scriptstyle p~is~prime } \frac{1}{p} \approx \frac{1}{2} + \sum_{k=2}^{\frac{n}{\ln n}} \frac{1}{k \ln k}. $$

Here we have identified the first simple from the amount, because when $k = 1$ according to the approximation of $k \ln k$ happens $to$ 0 resulting in division by zero.

We now estimate this sum using the integral of the same function $k$ from $2$ to $\frac{n}{\ln n}$ (we can produce such an approximation, because actually the money belongs to the integral as the approximation formula of rectangles):

$$ \sum_{k=2}^{\frac{n}{\ln n}} \frac{1}{k \ln k} \approx \int\limits_2^{\frac{n}{\ln n}} \frac{1}{k \ln k}\ dk. $$

Antiderivatives for the integrand $\ln \ln k$. Performing the substitution and removing members of a smaller order, we get:

$$ \int\limits_2^{\frac{n}{\ln n}} \frac{1}{k \ln k}\ dk = \ln \ln \frac{n}{\ln n} - \ln \ln 2 = \ln (\ln n - \ln \ln n) \ln \ln 2 \approx \ln \ln n. $$

Now, returning to the original sum, we obtain its approximate rating:

$$ \sum_{ \scriptstyle p \le n \atop\scriptstyle p~is~prime } \frac{n}{p} \approx n \ln \ln n + o(n), $$

what we wanted to prove.

A more rigorous proof (and gives a more accurate estimate accurate to constant multipliers) can be found in the book by Hardy and Wright "An Introduction to the Theory of Numbers" (p. 349).


\h2{ Various optimizations to the sieve of Eratosthenes }

The biggest drawback of the algorithm --- that he "walks" through memory, constantly going outside the cache memory, causing the constant hidden in the $O (n \log \log n)$, is relatively high.

In addition, for sufficiently large $n$ becomes the bottleneck memory footprint.

Below are some methods how to reduce the number of executed operations, and significantly reduce the memory consumption.


\h3{ Screening easy to root }

The most obvious point --- that in order to find all Prime to $n$, it suffices to perform a simple screening only, not exceeding the square root of $n$.

So, change the outer loop of the algorithm:

\code
for (int i=2; i*i<=n; ++i)
\endcode

On the asymptotic behavior of this optimization has no effect (indeed, repeating the above proof, we get the estimate $n \ln \ln \sqrt{n} + o(n)$, what properties of the logarithm, there are asymptotically the same), although the number of operations is considerably reduced.


\h3{ Sieve only on odd numbers }

Since all even numbers except $2$, --- compound, it is possible to stop working out did the even numbers, list only the odd numbers.

First, it will allow to halve the amount of memory required. Secondly, it will reduce the number done by algorithm operations approximately half.


\h3{ Reducing memory consumption }

Note that the algorithm of Eratosthenes actually operates with $n$ bits of memory. Therefore, it is possible to substantially reduce memory consumption by storing not $n$ bytes --- Boolean type variables, and $n$ bits, i.e., $n/8$ bytes of memory.

However, this approach --- \bf{"compression bit"} --- will significantly complicate the operation of these bits. Any read or write bit will be a few arithmetic operations, which ultimately will slow down the algorithm.

Thus, this approach is justified only if $n$ so large that $n$ bytes of memory to allocate. Saving memory (at $8$ times), we will pay a significant slowdown of the algorithm.

In conclusion, it is worth noting that in C++ already implemented containers, automatically performing the bit compression: vector<bool> and bitset<>. However, if speed is very important, it is better to implement bit compression manually by using bitwise operations --- to date, compilers are still not able to generate fast enough code.


\h3{ Block sieve }

Optimization of "simple sifting to the bottom" implies that there is no need to store all the time the whole array $prime[1 \ldots n]$. To perform a screening sufficient to store only simple root of $n$, i.e., $prime[1 \ldots \sqrt{n}]$, and the rest of the $prime$ to build a unit, keeping the current time only one block.

Let $s$ --- a constant defining the size of the block, then just be $\left\lceil \frac{n}{s} \right\rceil$ blocks, $k$-th block ($k = 0 \ldots \left\lfloor \frac{n}{s} \right\rfloor$) contains the numbers in the interval $[ks; ks+s-1]$. Will process the blocks in the queue, i.e. for each $k$-th block will iterate over all simple (from $1$ to $\sqrt{n}$) and perform the screening only within the current block. Gently should handle the first block --- first, simple from $[1; \sqrt{n}]$ must not remove themselves, and secondly, the number of $0$ and $1$ should be flagged as not simple. While processing the last block you should also not forget that last number $n$ is not necessarily in the end of the block.

Here is an implementation of the sieve block. The program reads the number of $n$ and finds a simple number from $1$ to $n$:

\code
const int SQRT_MAXN = 100000; // root of the maximum value of N
const int S = 10000;
bool nprime[SQRT_MAXN], bl[S];
int primes[SQRT_MAXN], cnt;

int main() {

int n;
cin >> n;
int nsqrt = (int) sqrt (n + .0);
for (int i=2; i<=nsqrt; ++i)
if (!nprime[i]) {
primes[cnt++] = i;
if (i * 1ll * i <= nsqrt)
for (int j=i*i; j<=nsqrt; j+=i)
nprime[j] = true;
}

int result = 0;
for (int k=0, maxk=n/S; k<=maxk; ++k) {
memset (bld, 0, sizeof bl);
int start = k * S;
for (int i=0; i<cnt; ++i) {
int start_idx = (start + primes[i] - 1) / primes[i];
int j = max(start_idx,2) * primes[i] - start;
for (; j<S; j+=primes[i])
bl[j] = true;
}
if (k == 0)
bl[0] = bl[1] = true;
for (int i=0; i<S && start+i<=n; ++i)
if (!bl[i])
++result;
}
cout << result;

}
\endcode

The asymptotic behavior of the sieve block is the same as the ordinary sieve of Eratosthenes (of course, if the size of $s$ units will not be very young), but memory usage will be reduced to $O(\sqrt{n} + s)$ and is reduced to "wandering" from memory. But, on the other hand, for each block for each Prime in $[1; \sqrt{n}]$ to run the division, which will be much impact at smaller block sizes. Therefore, the choice of the constant $s$ must be a balance.

Experiments show that the best performance is achieved when $s$ has a value of approximately $10^4$ to $10^5$.


\h3{ an Improvement to linear time }

The algorithm of Eratosthenes can be transformed into another algorithm that will work in linear time --- see \algohref=prime_sieve_linear{"Sieve of Eratosthenes with linear time"}. (However, this algorithm has its drawbacks.)
