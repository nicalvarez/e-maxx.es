the <h1>Matrix theorem of Kirchhoff. Finding the number of spanning trees</h1>
<p>an undirected graph Specified by its adjacency matrix. Multiple edges in the graph are allowed. You want to count the number of different spanning trees of this graph.</p>
<p>the formula below belongs to Kirchhoff (Kirchhoff), who proved it in 1847</p>
the <h2>Matrix theorem Kirchhoff</h2>
<p>we Take the adjacency matrix of the graph G, we replace each element of this matrix on the opposite, and the diagonal element instead of A<sub>i,i</sub> will deliver the degree of vertex i (if there are multiple edges, the degree of the vertex they counted with their multiplicity). Then according to matrix Kirchhoff theorem, all of algebraic supplements of this matrix are equal, and equal to the number of spanning trees of this graph. For example, you can delete the last row and last column of this matrix, and the modulus of its determinant will be equal to the desired number.</p>
<p>the Determinant of a matrix can be found in O (N<sup>3</sup>) using <algohref=determinant_gauss>Gaussian elimination</algohref> or <algohref=determinant_crout>method Croute</algohref>.</p>
<p>the Proof of this theorem is quite difficult and will not be discussed here (see, for example, Priezzhev V. B. "the Problem of the dimers and the theorem of Kirchhoff").</p>
the <h2>Connect with Kirchhoff's laws in electric circuits</h2>
<p>Between the matrix theorem of Kirchhoff and Kirchhoff's laws for electrical circuits there is a surprising connection.</p>
<p>it is Possible to show (as a consequence of Ohm's law and the first Kirchhoff's law) that the resistance R<sub>ij</sub> between points i and j of electric circuit is equal to:</p>
<formula>R<sub>ij</sub> = |T<sup>(i,j)</sup>| / |T<sup>j</sup>|</formula>
<p>where the matrix T obtained from the matrix A <i>reverse</i> of the resistances of the conductors (A<sub>ij</sub> is the inverse number to the resistance of the conductor between points i and j) by the transformation matrix described in theorem Kirchhoff, and the T<sup>(i)</sup> is the deletion of the row and column with number i, and T<sup>(i,j)</sup> - deletion of two rows and columns i and j.</p>
<p>the Kirchhoff Theorem gives this formula geometric meaning.</p>
