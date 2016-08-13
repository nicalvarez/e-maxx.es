the <h1>Modification of stack and queue to find the minimum in O (1)</h1>
<p>Here we consider three tasks: modifying the stack with the addition of finding the smallest element in O (1), a similar modification of the queue and their application to the problem of finding the minimum of all programming a fixed length of a given array in O (N).</p>
the <h2>the Modification of the stack</h2>
<p>you want to add the possibility of finding the minimum in the stack in O (1), retaining the same complexity of adding and removing elements from the stack.</p>
<p>this will store in the stack not the elements themselves, and the pairs: the element and the minimum in the stack, starting from this element and below. In other words, if we represent the stack as an array of pairs,</p>
<formula>stack[i].second = min { stack[j].first }
j = 0..i</formula>
<p>it is Clear that then to find the minimum in the whole stack would be just taking the value stack.top().second.</p>
<p>it is Also clear that when you add a new item to the stack is the value second will be equal to min (stack.top().second, new_element). Removing an element from the stack is no different from being deleted from the normal stack, because the deleted element could not affect the second value for the remaining elements.</p>
<p>Implementation:</p>
<code>stack&lt; pair&lt;int,int> > st;</code>
the <ul>
the <li>element Add:
<code>int minima = st.empty() ? new_element : min (new_element, st.top().second);
st.push (make_pair (new_element, minima));</code></li>
the <li>item:
<code>int result = st.top().first;
st.pop();</code></li>
the <li>to find the minimum:
<code>minima = st.top().second;</code></li>
</ul>
the <h2>the Modification queue. Method 1</h2>
<p>Here is a simple way to modify the queue, but has the disadvantage that the modified queue can actually store all the elements (i.e. when removing the element from the queue we will need to know the value of an element we want to extract). Clearly, this is a very specific situation (usually turn right just to learn the next element, but not Vice versa), however, this method is attractive in its simplicity. This method is applicable to the problem of finding the minimum in programming (see below).</p>
<p>the Key idea is to really keep in the queue all items and you only want us to determine the minimum. Namely, let the line is a non-decreasing sequence of numbers (i.e. in the mind is stored the lowest value), and, of course, not arbitrary, and always contains a minimum. Then the minimum in all queues will always be the first element. Before adding a new item to the queue, it helps to produce "cut": still in the tail of the queue is the element that most new item, we remove this element from the queue; then add a new item to the end of the queue. Thereby, on the one hand, not out of order, and on the other hand, don't lose the current element if it at any subsequent step will be the minimum. But when removing the head element from the queue it there, generally speaking, may not be - our modified turn could throw the item in the rebuild process. So when you delete an item we need to know the value of the extracted element if the element with that value is in the head of the queue, then extract it; otherwise just do nothing.</p>
<p>Consider the implementation of the above steps:</p>
<code>deque&lt;int> q;</code>
the <ul>
the <li>to find the minimum:
<code>current_minimum = q.front();</code></li>
the <li>element Add:
<code>while (!q.empty() && q.back() > added_element)
q.pop_back();
q.push_back (added_element);</code></li>
the <li>item:
<code>if (!q.empty() && q.front() == removed_element)
q.pop_front();</code></li>
</ul>
<p>it is Clear that on average the execution time of all these operations is O (1).</p>
the <h2>the Modification queue. Method 2</h2>
<p>we will Consider here another way to modify the queue to find the minimum in O (1), which is a little more complex to implement, but devoid of the main disadvantage of the previous method: all queue items actually stored in it, and, in particular, when removing the element does not need to know its value.</p>
<p>the Idea is to reduce the problem to a problem on the stacks that had already been solved by us. Learn how to simulate a queue using two stacks.</p>
<p>let's Create two stacks: s1 and s2; of course, refers to stacks that are modified to find the minimum in O (1). To add new items in the stack s1, and removing items from the stack s2. If you try to extract the item from stack s2 it was empty, just shift all the elements from stack s1 to a stack s2 (the elements in the stack s2 will turn out in reverse order, what we need to retrieve elements; the stack s1 will be empty). Finally, finding the minimum in the queue will actually be to find the minimum of the minimum in the stack s1 and s2 minimum on the stack.</p>
<p>thereby, we carry out all the operations remain O (1) (for the simple reason that each element in the worst case 1 time is added to the stack s1, 1 is transferred to the stack s2 and 1 s2 is popped from the stack).</p>
<p>Implementation:</p>
<code>stack&lt; pair&lt;int,int> > s1, s2;</code>
the <ul>
the <li>to find the minimum:
<code>if (s1.empty() || s2.empty())
current_minimum = s1.empty ? s2.top().second, s1.top().second;
else
current_minimum = min (s1.top().second, s2.top().second);</code></li>
the <li>element Add:
<code>int minima = s1.empty() ? new_element : min (new_element, s1.top().second);
s1.push (make_pair (new_element, minima));</code></li>
the <li>item:
<code>if (s2.empty())
while (!s1.empty()) {
int element = s1.top().first;
s1.pop();
int minima = s2.empty() ? element : min (element, s2.top().second);
s2.push (make_pair (element, minima));
}
result = s2.top().first;
s2.pop();</code></li>
</ul>
the <h2>the problem of nding the minimum in all programming of a fixed length of a given array</h2>
<p>Suppose you are given an array A of length N and an integer M &le; n. it is Required to find the minimum in each current segment of length M of the array, i.e. to find:</p>
<formula>min A[i], min, A[i], min, A[i], ..., min A[i]
0&le;i&le;M-1 1&le;i&le;M 2&le;i&le;M+1 N-M&le;i&le;N-1</formula>
<p>you Solve this problem in linear time, i.e. O (N).</p>
<p>it's enough to make the turn, modified to find the minimum in O (1), which was examined above, and in this problem, you can use any of the two methods for implementing a queue. Next, the solution is clear: let's add to the queue, the first M elements of the array, find the minimum and output it, then add to the queue the next element, and will learn from it the first element of the array, again derive the minimum, etc. Because all queue operations are performed in average constant time, the asymptotic behavior of the whole algorithm will work in O (N).</p>
<p>it is Worth noting that the implementation of the modified queue the first method easier, but it would probably need to store the entire array (because the i-th step need to know the i-th and (i-M)-th elements of the array). When implementing the queue the second method of the array A to store explicitly not need - only to learn the next, the i-th element of the array.</p>
