the <h1>Algorithm Rabin-Karp substring search in a string in O (N)</h1>

<p>This algorithm is based on hashing of strings, and those who are not familiar with the topic, refer to <algohref=string_hashes>"the hashing Algorithms in problems for the string"</algohref>.</p>

<p>&nbsp;</p>

<p>the authors of the algorithm - Rabin (Rabin) and Carp (Karp), 1987.</p>
<p>Given a string S and a text T consisting of lowercase English letters. You want to find all occurrences of string S in the text T in time O (|S| + |T|).</p>
<p>the Algorithm. Calculate the hash for a string S. let's Calculate the hash values for all prefixes of the string T. Now let's iterate over all substrings of T of length |S| and each is comparable to |S| in O (1).</p>
the <h2>Implementation</h2>
<code>string s, t; // input

// count all degrees of p
const int p = 31;
vector&lt;long long> p_pow (max (s.length(), t.length()));
p_pow[0] = 1;
for (size_t i=1; i&lt;p_pow.size(); ++i)
p_pow[i] = p_pow[i-1] * p;

// count the hashes of all prefixes of string T
vector&lt;long long> h (t.length());
for (size_t i=0; i&lt;t.length(); ++i)
{
h[i] = (t[i] - \'a\' + 1) * p_pow[i];
if (i) h[i] += h[i-1];
}

// count hash from the string S
long long h_s = 0;
for (size_t i=0; i&lt;s.length(); ++i)
h_s += (s[i] - \'a\' + 1) * p_pow[i];

// iterate over all substrings in T of length |S| and compare them
for (size_t i = 0; i + s.length() - 1 &lt; t.length(); ++i)
{
long long cur_h = h[i+s.length()-1];
if (i) cur_h -= h[i-1];
// here is the hashes to the same degree and compare
if (cur_h == h_s * p_pow[i])
cout &lt;&lt; i &lt;&lt; \' \';
}</code>
