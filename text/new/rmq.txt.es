<h1>the Task of RMQ (Range Minimum Query minimum on the interval)</h1>

<p>Given an array A[1..N]. Receive requests of the form (L, R), for each query you want to find the minimum in array A starting at position L and ending at position R.</p>
the <h2>Applications</h2>
<p>in Addition to direct application in a variety of tasks that include:</p>
the <ul>
the <li><algohref=lca>Task LCA (lowest common ancestor)</algohref></li>
</ul>
the <h2>Solution</h2>
<p>the Task of RMQ is solved by using data structures.</p>
<p>as described on the website of the data structures can be selected:</p>
the <ul>
the <li><algohref=sqrt_decomposition><b>Sqrt-decomposition</b></algohref> - answers a query in O (sqrt (N)), preprocessing time O (N).<br>the Advantage is that it is a very simple data structure. Drawback - asymptotics.</li>
the <li><algohref=segment_tree><b>Tree</b></algohref> - answers a query in O (log N), preprocessing time O (N).<br>Advantage - good asymptotics. The disadvantage is a larger amount of code compared to other data structures.</li>
the <li><algohref=fenwick_tree><b>Bit</b></algohref> - answers a query in O (log N), preprocessing time O (N log N)<br>the Advantage is very quickly written and works also very fast. But major drawback: the Bit can only respond to requests with L = 1, which is for many applications not applicable.</li>
</ul>
<p>note. "Preprocessing" is the preliminary processing of the array A is actually building the data structures for the given array.</p>
<p>Now suppose that the array A <b>can change</b> in the process (i.e. will also receive requests about changing the values in some interval [L;R]). Then, the resulting problem can be solved by using <algohref=sqrt_decomposition><b>Sqrt-decomposition</b></algohref> and <algohref=segment_tree><b>Wood cuts</b></algohref>.</p>
