the <h1>Efficient algorithms for factorization</h1>

<hr>

<p>Here are the implementations of several algorithms of factorization, each of which individually can work as fast and very slow, but in total they provide a very fast method.</p>
<p>the descriptions of these methods are not given, especially since they are well described on the Internet.</p>

the <h2>Method Pollard p-1</h2>
<p>a Probabilistic test that quickly provides an answer not for all numbers.</p>
<p>Returns either the found divisor or 1, if divisor was not found.</p>
<code>template &lt;class T>
Pollard_p_1 T (T n)
{
// the algorithm parameters significantly affect the performance and search quality
const T b = 13;
const T q[] = { 2, 3, 5, 7, 11, 13 };

// several attempts of algorithm
T a = 5 % n;
for (int j=0; j&lt;10; j++)
{

// search for such a which are mutually simple with n
while (gcd (a, n) != 1)
{
mulmod (a, a, n);
a += 3;
a %= n;
}

// computed a^M
for (size_t i = 0; i &lt; sizeof q / sizeof q[0]; i++)
{
T qq = q[i];
T e = (T) floor (log ((double)b) / log ((double)qq));
T aa = powmod (a, powmod (qq, e, n), n);
if (aa == 0)
continue;

// check if found the answer
T g = gcd (aa-1, n);
if (1 &lt; g && g &lt; n)
return g;
}

}

// if nothing was found
return 1;

}</code>

the <h2>Method of the Pollard "Rho"</h2>
<p>a Probabilistic test that quickly provides an answer not for all numbers.</p>
<p>Returns either the found divisor or 1, if divisor was not found.</p>
<code>template &lt;class T>
Pollard_rho T (T n, unsigned iterations_count = 100000)
{
T
b0 = rand() % n,
b1 = b0,
g;
mulmod (b1, b1, n);
if (++b1 == n)
b1 = 0;
g = gcd (abs (b1 - b0), n);
for (unsigned count=0; count&lt;iterations_count && (g == 1 || g == n); count++)
{
mulmod (b0, b0, n);
if (++b0 == n)
b0 = 0;
mulmod (b1, b1, n);
b1++;
mulmod (b1, b1, n);
if (++b1 == n)
b1 = 0;
g = gcd (abs (b1 - b0), n);
}
return g;
}</code>

the <h2>bent Method (a modification of the method of Pollard "Rho")</h2>
<p>a Probabilistic test that quickly provides an answer not for all numbers.</p>
<p>Returns either the found divisor or 1, if divisor was not found.</p>
<code>template &lt;class T>
Pollard_bent T (T n, unsigned iterations_count = 19)
{
T
b0 = rand() % n,
b1 = (b0*b0 + 2) % n,
a = b1;
for (unsigned iteration=0, series_len=1; iteration&lt;iterations_count; iteration++, series_len*=2)
{
T g = gcd (b1-b0, n);
for (unsigned len=0; len&lt;series_len && (g==1 && g==n); len++)
{
b1 = (b1*b1 + 2) % n;
g = gcd (abs(b1-b0), n);
}
b0 = a;
a = b1;
if (g != 1 && g != n)
return g;
}
return 1;
}</code>

the <h2>Method of Pollard Monte Carlo</h2>
<p>a Probabilistic test that quickly provides an answer not for all numbers.</p>
<p>Returns either the found divisor or 1, if divisor was not found.</p>
<code>template &lt;class T>
Pollard_monte_carlo T (T n, unsigned m = 100)
{
T b = rand() % (m-2) + 2;

static std::vector < T> primes;
static T m_max;
if (primes.empty())
primes.push_back (3);
if (m_max < m)
{
m_max = m;
for (T prime=5; prime&lt;=m; ++++ prime)
{
bool is_prime = true;
for (std::vector&lt;T>::const_iterator iter=primes.begin(), end=primes.end();
iter!=end; ++iter)
{
T div = *iter;
if (div*div > prime)
break;
if (prime % div == 0)
{
is_prime = false;
break;
}
}
if (is_prime)
primes.push_back (prime);
}
}

T g = 1;
for (size_t i=0; i&lt;primes.size() && g==1; i++)
{
T cur = primes[i];
while (cur &lt;= n)
cur *= primes[i];
cur /= primes[i];
b = powmod (b, cur, n);
g = gcd (abs(b-1), n);
if (g == n)
g = 1;
}

return g;
}</code>

the <h2>Method Farm</h2>
<p>This is an absolute method, but it can run very slowly if the number has small factors.</p>
<p>Therefore so run it only after all other methods.</p>
<code>template &lt;class T, class T2>
Ferma T (const T & n, T2 unused)
{
T2
x = sq_root (n),
y = 0,
r = x*x - y*y - n;
for (;;)
if (r == 0)
return x!=y ? x-y : x+y;
else
if (r > 0)
{
r -= y+y+1;
y++;
}
else
{
r += x+x+1;
x++;
}
}</code>

the <h2>Trivial division</h2>
<p>This simple method is useful to treat numbers with very small divisors.</p>
<code>template &lt;class T, class T2>
T2 prime_div_trivial (const T & n, T2 m)
{

// first check the trivial cases
if (n == 2 || n == 3)
return 1;
if (n < 2)
return 0;
if (even (n))
return 2;

// generated from simple 3 to m
T2 pi;
const vector&lt;T2> & primes = get_primes (m, pi);

// divide by all Prime
for (std::vector&lt;T2>::const_iterator iter=primes.begin(), end=primes.end();
iter!=end; ++iter)
{
const T2 & div = *iter;
if (div * div > n)
break;
else
if (n % div == 0)
return div;
}

if (n < m*m)
return 1;
return 0;

}</code>

the <h2>putting it all together</h2>
<p>Combine all methods in one function.</p>
<p>Also, the function uses the test for simplicity, otherwise the algorithms of factorization can work a very long time. For example, you can choose the BPSW test (<algohref=bpsw>read the article at BPSW</algohref>).</p>
<code>template &lt;class T, class T2>
void factorize (const T & n, std::map < T,unsigned> & result, T2 unused)
{
if (n == 1)
;
else
// check whether a simple number
if (isprime (n))
++result[n];
else
// if the number is small enough, its biodegradable, simple brute force
if (n < 1000*1000)
{
T div = prime_div_trivial (n, 1000);
++result[div];
factorize (n / div, result, unused);
}
else
{
// the number is large, run the algorithms of factorization
Div T;
// first there are fast algorithms of Pollard
div = pollard_monte_carlo (n);
if (div == 1)
div = pollard_rho (n);
if (div == 1)
div = pollard_p_1 (n);
if (div == 1)
div = pollard_bent (n);
// have to run 100% Farm algorithm
if (div == 1)
div = ferma (n, unused);
// recursively processed found multipliers
factorize (div, result, unused);
factorize (n / div, result, unused);
}
}</code>

<hr>

the <h2>the Application</h2>
<p><a href="factorization.zip">Download [5 MB]</a> the source program that uses all the methods of factorization and the BPSW test for primality.</p>
