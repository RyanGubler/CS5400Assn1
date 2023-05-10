
Step 1 Compute delta(X) & delta(Y):
delta(X) x_2 - x_1
delta(Y) = y_2 - y_1

Step 2 determine how many points to compute:
if |delta(X)| > |delta(Y)| then number = |delta(X)| + 1 else number = |delta(Y)| + 1

Step 3 Compute X & Y increments:
sigma(x) = delta(X) / number
sigma(y) = delta(Y) / number

Step 4 Plot the points

Bresenham Algorithm
Concept: Difference of distances, using a decision parameter P_k
Benefit: Line scan conversion that uses only incremental integer calculations.
Consider only 1 >= m >= 0; handle other cases by symmetry
Assume pixel centers are at half integers
If we start at a pixel that has already been written, only two candidates for the next pixel.
P_k is the current decision parameter
P_k+1 is the next decision parameter
d_1 is the distance from the y-intercept at P_x+1 at y_k: y-y_x or m(x_k + 1) + b - y_k
d_2 is the distance from the y-intercept at P_x+11 at y_k + 1:(y_K + 1) - y or y_k + 1 - m(x_k + 1) - b
The next pixel to draw is x_k+1 = x_k + 1
y_k+1 = d_1-d_2 >= 0? y_k + 1:y_k
if d_1 - d_2 is positive, then y_k + 1 else y_k
We use this to create a Decision Parameter P_k

d_1 - d_2 = (y-y_k)-((y_k + 1)-y)
d_1=y-y_k -> m(x_k + 1) + b - y_k
d_2(y_k + 1) -y -> y_k + 1 - m(x_k + 1) - b
d_1 -d_2 = 2m(x_k+ 1) -2_y_k + 2b - 1
d_1 - d_2 = m(x_k + 1) +b - y_k -y_k - 1 + m(x_k + 1) + b

subsitute m with delta(y)/delta(x)

P_k = 2*delta(y)*x_k - 2*delta(x)*y_k+1 + c
remember that x_k+1 = x_k + 1

P_k+1 = P_k + 2*delta(y) - 2*delta(x)(y_k+1 - y_k) 	Decision Parameter

