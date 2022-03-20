<head>
	<h1>  Currency Conversion API  </h1>
</head>
<body>
	<p align="center">
  <img src="./images/logo_e.png" width="200" title="Conversion">
</p>
<div>
  
  ##  Description:  
   - This project is an API that looks for the best conversion of a currency given a certain availability of conversions. 
   
  ##  Running:  
   - Clone code - "git clone url_repository" .

   - Running "npm install" in path .
   
   - Create an .env file from .envexample
   
   - run "npm run start:dev"
  ## Features:
  - Finding the best conversion path
  - CSV generation with conversion data

  ## Route:
  - GET : /conversion

  ##  The Problem:
   - Imagine that a bank is having some difficulty in converting some currencies to serve its customers, but it has a partner network in which it can use other currencies to carry out this exchange:

   - Ex: A customer needs to exchange 100 Canadian Dollars to Euro, but the bank does not have Euro for the exchange, but he has an American partner that he can convert 100 Canadian Dollars to US Dollar and his partner converts to Euro, CAD -> USD -> EUR, given this possibility, the manager asked for a report containing all the conversion possibilities, but that they are the smallest and best possible for his client.

  ##  The Proposed Solution:
   - To solve this problem, we developed an api that has a conversion route, where upon request a CSV file will be generated with all the best conversions for the given group of currencies and possible conversions.

   - The great challenge of the project is the search for the best conversion of each currency, where for this we use the Djikstra algorithm as a basis, having as a point of attention that the problem is a directed graph which made us have the approach of for the In the opposite sense of the node we put an infinite weight.

  ##   Diagram:
	
<img src="./images/diagram.png" title="Diagram" width="500" height="500">

  ##   Result:
	
<img src="./images/result.png" title="Result" width="500" height="500">
	
  ##   Dijkstra:

<img src="./images/dijkstra.gif" title="Dijkstra" width="350" height="350">

  - To solve this problem, the master strategy shown above was used, we started with all currencies with infinite weight except the initial one, which is the Canadian dollar (CAD).
  - Then we start the walk through the graph where we use an object to control the unvisited nodes and then look at its neighbors and update the weights.
  - Finally, we perform the search for the best path in the weighted graph, this walk is done from the end to the beginning of the graph and looking for the best path.
  - NOTE: The problem behaves like a directed graph, so the opposite directions were created with infinite weights, making these paths discard.
</div>

</body>

<footer>
  <p>Mário Wessen - <a href="mailto:mariowessen@gmail.com">mariowessen@gmail.com</a></p>
</footer>




