
function getCountries(serverURL, onLoadEnd) {

	var query = {
	    "statements" : [ ]
	};

	var statementSt = "MATCH (c:COUNTRY) RETURN c.name";

	query.statements.push({"statement": statementSt});

	var xhr = new XMLHttpRequest();    
	xhr.onloadend = onLoadEnd;
	xhr.open("POST", serverURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json; charset=UTF-8');
	xhr.send(JSON.stringify(query));

}

function getSectors(serverURL, onLoadEnd){

	var query = {
	    "statements" : [ ]
	};

	var statementSt = "MATCH (s:SECTOR) RETURN s.name ORDER BY s.name ASC";

	query.statements.push({"statement":statementSt});

	var xhr = new XMLHttpRequest();    
	xhr.onloadend = onLoadEnd;
	xhr.open("POST", serverURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json; charset=UTF-8');
	xhr.send(JSON.stringify(query));

}

function getSandbagSectors(serverURL, onLoadEnd){
    var query = {
	    "statements" : [ ]
	};

	var statementSt = "MATCH (s:SANDBAG_SECTOR) RETURN s.name ORDER BY s.name ASC";

	query.statements.push({"statement":statementSt});

	var xhr = new XMLHttpRequest();    
	xhr.onloadend = onLoadEnd;
	xhr.open("POST", serverURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json; charset=UTF-8');
	xhr.send(JSON.stringify(query));
}

function getPeriods(serverURL, onLoadEnd){

	var query = {
	    "statements" : [ ]
	};

	var statementSt = "MATCH (p:PERIOD) RETURN p.name ORDER BY p.name ASC";

	query.statements.push({"statement":statementSt});

	var xhr = new XMLHttpRequest();    
	xhr.onloadend = onLoadEnd;
	xhr.open("POST", serverURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json; charset=UTF-8');
	xhr.send(JSON.stringify(query));

}

function getVerifiedEmissionsForAllPeriods(serverURL, includeAviation, onLoadEnd){
    var query = {
	    "statements" : [ ]
	};
    
	var statementSt;
    
    if(includeAviation == "Include Aviation"){
            
        statementSt = "MATCH ()-[ve:VERIFIED_EMISSIONS]->(p:PERIOD) " +
				      "RETURN sum(ve.value) AS Verified_Emissions, p.name AS Period ORDER BY p.name";
        
    }else if(includeAviation == "Exclude Aviation"){
        
        statementSt = "MATCH (i:INSTALLATION)-[ve:VERIFIED_EMISSIONS]->(p:PERIOD) " +
				      "RETURN sum(ve.value) AS Verified_Emissions, p.name AS Period ORDER BY p.name";
      
    }else if(includeAviation == "Show only Aviation"){   
        
        statementSt = "MATCH (ao:AIRCRAFT_OPERATOR)-[ve:VERIFIED_EMISSIONS]->(p:PERIOD) " +
				      "RETURN sum(ve.value) AS Verified_Emissions, p.name AS Period ORDER BY p.name";      

    } 
        
	query.statements.push({"statement":statementSt});

	var xhr = new XMLHttpRequest();    
	xhr.onloadend = onLoadEnd;
	xhr.open("POST", serverURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json; charset=UTF-8');
	xhr.send(JSON.stringify(query));
}

function getVerifiedEmissionsEUWide(serverURL, includeAviation, onLoadEnd){
    var query = {
	    "statements" : [ ]
	};
    
	var statementSt;
    
    if(includeAviation == "Include Aviation"){
            
        statementSt = "MATCH (c:COUNTRY)-[ve:VERIFIED_EMISSIONS_EU_WIDE]->(p:PERIOD) " +
                      "WHERE c.id = 'EU' AND ve.type = 'all'" +
				      "RETURN sum(ve.value) AS Verified_Emissions, p.name AS Period ORDER BY p.name";
        
    }else if(includeAviation == "Exclude Aviation"){
        
        statementSt = "MATCH (c:COUNTRY)-[ve:VERIFIED_EMISSIONS_EU_WIDE]->(p:PERIOD) " +
                      "WHERE c.id = 'EU' AND ve.type = 'installations' " +
				      "RETURN sum(ve.value) AS Verified_Emissions, p.name AS Period ORDER BY p.name";
      
    }else if(includeAviation == "Show only Aviation"){   
        
        statementSt = "MATCH (c:COUNTRY)-[ve:VERIFIED_EMISSIONS_EU_WIDE]->(p:PERIOD) " +
                      "WHERE c.id = 'EU' AND ve.type = 'aviation' " +
				      "RETURN sum(ve.value) AS Verified_Emissions, p.name AS Period ORDER BY p.name";

    } 
        
	query.statements.push({"statement":statementSt});

	var xhr = new XMLHttpRequest();    
	xhr.onloadend = onLoadEnd;
	xhr.open("POST", serverURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json; charset=UTF-8');
	xhr.send(JSON.stringify(query));
}

function getFreeAllocationForAllPeriods(serverURL, includeAviation, onLoadEnd){
    var query = {
	    "statements" : [ ]
	};

	var statementSt;
    
    if(includeAviation == "Include Aviation"){
            
        statementSt = "MATCH ()-[aa:ALLOWANCES_IN_ALLOCATION]->(p:PERIOD) " +
				      "RETURN sum(aa.value) AS Free_Allocation, p.name AS Period ORDER BY p.name";
            
    }else if(includeAviation == "Exclude Aviation"){
        
        statementSt = "MATCH (i:INSTALLATION)-[aa:ALLOWANCES_IN_ALLOCATION]->(p:PERIOD) " +
				      "RETURN sum(aa.value) AS Free_Allocation, p.name AS Period ORDER BY p.name";
      
    }else if(includeAviation == "Show only Aviation"){   
        
        statementSt = "MATCH (ao:AIRCRAFT_OPERATOR)-[aa:ALLOWANCES_IN_ALLOCATION]->(p:PERIOD) " +
				      "RETURN sum(aa.value) AS Free_Allocation, p.name AS Period ORDER BY p.name";            

    } 
    
	query.statements.push({"statement":statementSt});

	var xhr = new XMLHttpRequest();    
	xhr.onloadend = onLoadEnd;
	xhr.open("POST", serverURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json; charset=UTF-8');
	xhr.send(JSON.stringify(query));
}

function getFreeAllocationEUWide(serverURL, includeAviation, onLoadEnd){
    var query = {
	    "statements" : [ ]
	};

	var statementSt;
    
    if(includeAviation == "Include Aviation"){
            
        statementSt = "MATCH (c:COUNTRY)-[aa:ALLOWANCES_IN_ALLOCATION_EU_WIDE]->(p:PERIOD) " +
                      "WHERE c.id = 'EU' AND aa.type = 'all' " +
				      "RETURN sum(aa.value) AS Free_Allocation, p.name AS Period ORDER BY p.name";
            
    }else if(includeAviation == "Exclude Aviation"){
        
        statementSt = "MATCH (c:COUNTRY)-[aa:ALLOWANCES_IN_ALLOCATION_EU_WIDE]->(p:PERIOD) " +
                      "WHERE c.id = 'EU' AND aa.type = 'installations' " +
				      "RETURN sum(aa.value) AS Free_Allocation, p.name AS Period ORDER BY p.name";
      
    }else if(includeAviation == "Show only Aviation"){   
        
        statementSt = "MATCH (c:COUNTRY)-[aa:ALLOWANCES_IN_ALLOCATION_EU_WIDE]->(p:PERIOD) " +
                      "WHERE c.id = 'EU' AND aa.type = 'aviation' " +
				      "RETURN sum(aa.value) AS Free_Allocation, p.name AS Period ORDER BY p.name";        

    } 
    
	query.statements.push({"statement":statementSt});

	var xhr = new XMLHttpRequest();    
	xhr.onloadend = onLoadEnd;
	xhr.open("POST", serverURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json; charset=UTF-8');
	xhr.send(JSON.stringify(query));
}

function getLegalCapForAllPeriods(serverURL, includeAviation, onLoadEnd){
    var query = {
	    "statements" : [ ]
	};

	var statementSt;
    
    if(includeAviation == "Include Aviation"){
            
        statementSt = "MATCH (node)-[lc:LEGAL_CAP]->(p:PERIOD) " +
                    "WHERE node:COUNTRY OR (node:SANDBAG_SECTOR AND node.name = 'Aviation') " +
                    "RETURN sum(lc.amount) AS Legal_Cap, p.name AS Period ORDER BY p.name";
        
    }else if(includeAviation == "Exclude Aviation"){
        
        statementSt = "MATCH (:COUNTRY)-[lc:LEGAL_CAP]->(p:PERIOD) " +
                    "RETURN lc.amount AS Legal_Cap, p.name AS Period ORDER BY p.name";
      
    }else if(includeAviation == "Show only Aviation"){   
        
        statementSt = "MATCH (node)-[lc:LEGAL_CAP]->(p:PERIOD) " +
                    "WHERE (node:SANDBAG_SECTOR AND node.name = 'Aviation') " +
                    "RETURN sum(lc.amount) AS Legal_Cap, p.name AS Period ORDER BY p.name";     

    }     
    
	query.statements.push({"statement":statementSt});

	var xhr = new XMLHttpRequest();    
	xhr.onloadend = onLoadEnd;
	xhr.open("POST", serverURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json; charset=UTF-8');
	xhr.send(JSON.stringify(query));
}

function getLegalCapEUWide(serverURL, includeAviation, onLoadEnd){
    var query = {
	    "statements" : [ ]
	};

	var statementSt;
    
    if(includeAviation == "Include Aviation"){
            
        statementSt = "MATCH (c:COUNTRY)-[lc:LEGAL_CAP_EU_WIDE]->(p:PERIOD) " +
                    "WHERE c.id = 'EU' AND lc.type = 'all' " +
                    "RETURN sum(lc.value) AS Legal_Cap, p.name AS Period ORDER BY p.name";
        
    }else if(includeAviation == "Exclude Aviation"){
        
        statementSt = "MATCH (c:COUNTRY)-[lc:LEGAL_CAP_EU_WIDE]->(p:PERIOD) " +
                    "WHERE c.id = 'EU' AND lc.type = 'installations' " +
                    "RETURN sum(lc.value) AS Legal_Cap, p.name AS Period ORDER BY p.name";
      
    }else if(includeAviation == "Show only Aviation"){   
        
        statementSt = "MATCH (c:COUNTRY)-[lc:LEGAL_CAP_EU_WIDE]->(p:PERIOD) " +
                    "WHERE c.id = 'EU' AND lc.type = 'aviation' " +
                    "RETURN sum(lc.value) AS Legal_Cap, p.name AS Period ORDER BY p.name";     

    }     
    
	query.statements.push({"statement":statementSt});

	var xhr = new XMLHttpRequest();    
	xhr.onloadend = onLoadEnd;
	xhr.open("POST", serverURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json; charset=UTF-8');
	xhr.send(JSON.stringify(query));
}


function getOffsetsForAllPeriods(serverURL, includeAviation, onLoadEnd){
    var query = {
	    "statements" : []
	};

	var statementSt;
    
    if(includeAviation == "Include Aviation"){
            
        statementSt = "MATCH (node)-[:OFFSETS]-(o:OFFSET)-[:OFFSET_PERIOD]->(p:PERIOD) " +
                    "WHERE (o.unit_type = 'ERU' OR o.unit_type = 'CER') AND (node:INSTALLATION OR node:AIRCRAFT_OPERATOR) " +
                    "RETURN sum(o.amount) AS Offsets, p.name AS Period ORDER BY p.name" +
                    " UNION " +
                    "MATCH (p:PERIOD)<-[:OFFSET_PERIOD]-(o:OFFSET)-[offs:OFFSETS_2013_ONWARDS]-() " + 
                    "WHERE (o.unit_type = 'ERU' OR o.unit_type = 'CER') AND offs.type = 'all' " +
                    "RETURN sum(o.amount) AS Offsets, p.name AS Period ORDER BY p.name";
            
    }else if(includeAviation == "Exclude Aviation"){
            
        statementSt = "MATCH (:INSTALLATION)-[:OFFSETS]-(o:OFFSET)-[:OFFSET_PERIOD]->(p:PERIOD) " +
                    "WHERE (o.unit_type = 'ERU' OR o.unit_type = 'CER') " +
                    "RETURN sum(o.amount) AS Offsets, p.name AS Period ORDER BY p.name" + 
                    " UNION " +
                    "MATCH (p:PERIOD)<-[:OFFSET_PERIOD]-(o:OFFSET)-[offs:OFFSETS_2013_ONWARDS]-() " + 
                    "WHERE (o.unit_type = 'ERU' OR o.unit_type = 'CER') AND offs.type = 'installations' " +
                    "RETURN sum(o.amount) AS Offsets, p.name AS Period ORDER BY p.name";
            
    }else if(includeAviation == "Show only Aviation"){            
            
        statementSt = "MATCH (:AIRCRAFT_OPERATOR)-[:OFFSETS]-(o:OFFSET)-[:OFFSET_PERIOD]->(p:PERIOD) " +
                    "WHERE (o.unit_type = 'ERU' OR o.unit_type = 'CER') " +
                    "RETURN sum(o.amount) AS Offsets, p.name AS Period ORDER BY p.name" + 
                    " UNION " +
                    "MATCH (p:PERIOD)<-[:OFFSET_PERIOD]-(o:OFFSET)-[offs:OFFSETS_2013_ONWARDS]-() " + 
                    "WHERE (o.unit_type = 'ERU' OR o.unit_type = 'CER') AND offs.type = 'aviation' " +
                    "RETURN sum(o.amount) AS Offsets, p.name AS Period ORDER BY p.name";   
    } 
    
    
    //console.log(statementSt);
    
    
	query.statements.push({"statement":statementSt});

	var xhr = new XMLHttpRequest();    
	xhr.onloadend = onLoadEnd;
	xhr.open("POST", serverURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json; charset=UTF-8');
	xhr.send(JSON.stringify(query));
}

function getOffsetsEUWide(serverURL, includeAviation, onLoadEnd){
    var query = {
	    "statements" : []
	};

	var statementSt;
    
    if(includeAviation == "Include Aviation"){
            
        statementSt = "MATCH (c:COUNTRY)-[o:OFFSETS_EU_WIDE]->(p:PERIOD) " +
                    "WHERE c.id = 'EU' AND  o.type = 'all' " +
                    "RETURN sum(o.value) AS Offsets, p.name AS Period ORDER BY p.name";
            
    }else if(includeAviation == "Exclude Aviation"){
            
        statementSt = "MATCH (c:COUNTRY)-[o:OFFSETS_EU_WIDE]->(p:PERIOD) " +
                    "WHERE c.id = 'EU' AND  o.type = 'installations' " +
                    "RETURN sum(o.value) AS Offsets, p.name AS Period ORDER BY p.name";
            
    }else if(includeAviation == "Show only Aviation"){            
            
        statementSt = "MATCH (c:COUNTRY)-[o:OFFSETS_EU_WIDE]->(p:PERIOD) " +
                    "WHERE c.id = 'EU' AND  o.type = 'aviation' " +
                    "RETURN sum(o.value) AS Offsets, p.name AS Period ORDER BY p.name"; 
    } 
    
    
    //console.log(statementSt);
    
    
	query.statements.push({"statement":statementSt});

	var xhr = new XMLHttpRequest();    
	xhr.onloadend = onLoadEnd;
	xhr.open("POST", serverURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json; charset=UTF-8');
	xhr.send(JSON.stringify(query));
}

function getOffsetEntitlementsForAllPeriods(serverURL, includeAviation, onLoadEnd){
    
    
    var query = {
	    "statements" : [ ]
	};
    
    
    if(includeAviation == "Include Aviation"){
            
        statementSt = "MATCH ()-[r:OFFSET_ENTITLEMENT]->() RETURN sum(toFloat(r.value)) AS Total_Entitlements";
            
    }else if(includeAviation == "Exclude Aviation"){
        
        statementSt = "MATCH (:INSTALLATION)-[r:OFFSET_ENTITLEMENT]->() RETURN sum(toFloat(r.value)) AS Total_Entitlements";           
            
    }else if(includeAviation == "Show only Aviation"){            
         
        statementSt = "MATCH (:AIRCRAFT_OPERATOR)-[r:OFFSET_ENTITLEMENT]->() RETURN sum(toFloat(r.value)) AS Total_Entitlements";      
        
    }
    
	query.statements.push({"statement":statementSt});

	var xhr = new XMLHttpRequest();    
	xhr.onloadend = onLoadEnd;
	xhr.open("POST", serverURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json; charset=UTF-8');
	xhr.send(JSON.stringify(query));
}

function getOffsetEntitlementsEUWide(serverURL, includeAviation, onLoadEnd){
    
    
    var query = {
	    "statements" : [ ]
	};
    
    
    if(includeAviation == "Include Aviation"){
            
        statementSt = "MATCH (c:COUNTRY)-[r:OFFSET_ENTITLEMENT_EU_WIDE]->() " +
                    "WHERE c.id = 'EU' AND r.type = 'all' " +
                    "RETURN sum(toFloat(r.value)) AS Total_Entitlements";
            
    }else if(includeAviation == "Exclude Aviation"){
        
        statementSt = "MATCH (c:COUNTRY)-[r:OFFSET_ENTITLEMENT_EU_WIDE]->() " +
                    "WHERE c.id = 'EU' AND r.type = 'installations' " +
                    "RETURN sum(toFloat(r.value)) AS Total_Entitlements";           
            
    }else if(includeAviation == "Show only Aviation"){            
         
        statementSt = "MATCH (c:COUNTRY)-[r:OFFSET_ENTITLEMENT_EU_WIDE]->() " +
                    "WHERE c.id = 'EU' AND r.type = 'aviation' " + 
                    "RETURN sum(toFloat(r.value)) AS Total_Entitlements";      
        
    }
    
	query.statements.push({"statement":statementSt});

	var xhr = new XMLHttpRequest();    
	xhr.onloadend = onLoadEnd;
	xhr.open("POST", serverURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json; charset=UTF-8');
	xhr.send(JSON.stringify(query));
}

function getAuctionedForAllPeriods(serverURL, includeAviation, onLoadEnd){
    var query = {
	    "statements" : [ ]
	};
    
    var statementSt;
    
    if(includeAviation == "Include Aviation"){
            
        statementSt = "MATCH (c:COUNTRY)-[a:AUCTIONED]->(p:PERIOD) "+
					   "RETURN sum(a.amount) AS Auctioned, p.name AS Period ORDER BY p.name " +
                      "UNION " +
                      "MATCH (n:NER300)-[a:AUCTIONED]->(p:PERIOD) " +
                      "RETURN sum(a.amount) AS Auctioned, p.name AS Period ORDER BY p.name ";
            
    }else if(includeAviation == "Exclude Aviation"){
            
        statementSt = "MATCH (c:COUNTRY)-[a:AUCTIONED]->(p:PERIOD) "+
					   "WHERE a.type = 'Installation' RETURN sum(a.amount) AS Auctioned, p.name AS Period ORDER BY p.name " +
                      "UNION " +
                      "MATCH (n:NER300)-[a:AUCTIONED]->(p:PERIOD) " +
                      "RETURN sum(a.amount) AS Auctioned, p.name AS Period ORDER BY p.name ";
            
    }else if(includeAviation == "Show only Aviation"){            
            
        statementSt = "MATCH (c:COUNTRY)-[a:AUCTIONED]->(p:PERIOD) "+
					   "WHERE a.type = 'Aircraft Operator' RETURN sum(a.amount) AS Auctioned, p.name AS Period ORDER BY p.name";    
    }
	    
    //console.log("statement!", statementSt);

	query.statements.push({"statement":statementSt});

	var xhr = new XMLHttpRequest();    
	xhr.onloadend = onLoadEnd;
	xhr.open("POST", serverURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json; charset=UTF-8');
	xhr.send(JSON.stringify(query));
}

function getAuctionedEUWide(serverURL, includeAviation, onLoadEnd){
    var query = {
	    "statements" : [ ]
	};
    
    var statementSt;
    
    if(includeAviation == "Include Aviation"){
            
        statementSt = "MATCH (c:COUNTRY)-[a:AUCTIONED_EU_WIDE]->(p:PERIOD) "+
                      "WHERE c.id = 'EU' AND a.type = 'all' " + 
				      "RETURN sum(a.value) AS Auctioned, p.name AS Period ORDER BY p.name ";                      
            
    }else if(includeAviation == "Exclude Aviation"){
            
        statementSt = "MATCH (c:COUNTRY)-[a:AUCTIONED_EU_WIDE]->(p:PERIOD) "+
                      "WHERE c.id = 'EU' AND a.type = 'installations' " + 
				      "RETURN sum(a.value) AS Auctioned, p.name AS Period ORDER BY p.name ";   
            
    }else if(includeAviation == "Show only Aviation"){            
            
        statementSt = "MATCH (c:COUNTRY)-[a:AUCTIONED_EU_WIDE]->(p:PERIOD) "+
                      "WHERE c.id = 'EU' AND a.type = 'aviation' " +
				      "RETURN sum(a.value) AS Auctioned, p.name AS Period ORDER BY p.name ";       
    }
	    
    //console.log("statement!", statementSt);

	query.statements.push({"statement":statementSt});

	var xhr = new XMLHttpRequest();    
	xhr.onloadend = onLoadEnd;
	xhr.open("POST", serverURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json; charset=UTF-8');
	xhr.send(JSON.stringify(query));
}

function getVerifiedEmissionsForPeriod(serverURL, periodName, powerFlagValue, onLoadEnd){
    
    var query = {
	    "statements" : [ ]
	};

    var statementSt;
    
    if(powerFlagValue == 'Include Power installations'){
        
        statementSt = "MATCH (c:COUNTRY)<-[:INSTALLATION_COUNTRY|AIRCRAFT_OPERATOR_COUNTRY]-(node)-[:INSTALLATION_SECTOR|AIRCRAFT_OPERATOR_SECTOR]->(s:SECTOR)<-[:AGGREGATES_SECTOR]-(ss:SANDBAG_SECTOR)," +
                        "(node)-[ve:VERIFIED_EMISSIONS]->(p:PERIOD) " +
                       "WHERE p.name IN " + periodName + " " +
					   "RETURN sum(ve.value) AS Verified_Emissions, c.name, ss.name, p.name ORDER BY c.name, ss.name";
        
    }else if(powerFlagValue == 'Exclude Power installations'){
        
        statementSt = "MATCH (c:COUNTRY)<-[:INSTALLATION_COUNTRY|AIRCRAFT_OPERATOR_COUNTRY]-(node)-[:INSTALLATION_SECTOR|AIRCRAFT_OPERATOR_SECTOR]->(s:SECTOR)<-[:AGGREGATES_SECTOR]-(ss:SANDBAG_SECTOR)," +
                        "(node)-[ve:VERIFIED_EMISSIONS]->(p:PERIOD) " +
                       "WHERE p.name IN " + periodName + " AND node.power_flag <> 'true' " +
					   "RETURN sum(ve.value) AS Verified_Emissions, c.name, ss.name, p.name ORDER BY c.name, ss.name";     
        
        
    }else if(powerFlagValue == 'Show only Power installations'){
        
        statementSt = "MATCH (c:COUNTRY)<-[:INSTALLATION_COUNTRY|AIRCRAFT_OPERATOR_COUNTRY]-(node)-[:INSTALLATION_SECTOR|AIRCRAFT_OPERATOR_SECTOR]->(s:SECTOR)<-[:AGGREGATES_SECTOR]-(ss:SANDBAG_SECTOR)," +
                        "(node)-[ve:VERIFIED_EMISSIONS]->(p:PERIOD) " +
                       "WHERE p.name IN " + periodName + " AND node.power_flag = 'true' " +
					   "RETURN sum(ve.value) AS Verified_Emissions, c.name, ss.name, p.name ORDER BY c.name, ss.name";
        
    }
    
    query.statements.push({"statement":statementSt});

	var xhr = new XMLHttpRequest();    
	xhr.onloadend = onLoadEnd;
	xhr.open("POST", serverURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json; charset=UTF-8');
	xhr.send(JSON.stringify(query));
}

function getFreeAllocationForPeriod(serverURL, periodName, powerFlagValue, onLoadEnd){
    
    console.log("getFreeAllocationForPeriod");
    
    var query = {
	    "statements" : [ ]
	};
    
    var statementSt;
    
    if(powerFlagValue == 'Include Power installations'){
        
        statementSt = "MATCH (c:COUNTRY)<-[:INSTALLATION_COUNTRY|AIRCRAFT_OPERATOR_COUNTRY]-(node)-[:INSTALLATION_SECTOR|AIRCRAFT_OPERATOR_SECTOR]->(s:SECTOR)<-[:AGGREGATES_SECTOR]-(ss:SANDBAG_SECTOR)," +
                        "(node)-[aa:ALLOWANCES_IN_ALLOCATION]->(p:PERIOD) " +
                       "WHERE p.name IN " + periodName + " " +
					   "RETURN sum(aa.value) AS Free_Allocation, c.name, ss.name, p.name ORDER BY c.name, ss.name ";
        
    }else if(powerFlagValue == 'Exclude Power installations'){
          
        statementSt = "MATCH (c:COUNTRY)<-[:INSTALLATION_COUNTRY|AIRCRAFT_OPERATOR_COUNTRY]-(node)-[:INSTALLATION_SECTOR|AIRCRAFT_OPERATOR_SECTOR]->(s:SECTOR)<-[:AGGREGATES_SECTOR]-(ss:SANDBAG_SECTOR)," +
                        "(node)-[aa:ALLOWANCES_IN_ALLOCATION]->(p:PERIOD) " +
                       "WHERE p.name IN " + periodName + " AND node.power_flag <> 'true' " +
					   "RETURN sum(aa.value) AS Free_Allocation, c.name, ss.name, p.name ORDER BY c.name, ss.name ";
        
    }else if(powerFlagValue == 'Show only Power installations'){
        
        statementSt = "MATCH (c:COUNTRY)<-[:INSTALLATION_COUNTRY|AIRCRAFT_OPERATOR_COUNTRY]-(node)-[:INSTALLATION_SECTOR|AIRCRAFT_OPERATOR_SECTOR]->(s:SECTOR)<-[:AGGREGATES_SECTOR]-(ss:SANDBAG_SECTOR)," +
                        "(node)-[aa:ALLOWANCES_IN_ALLOCATION]->(p:PERIOD) " +
                       "WHERE p.name IN " + periodName + " AND node.power_flag = 'true' " +
					   "RETURN sum(aa.value) AS Free_Allocation, c.name, ss.name, p.name ORDER BY c.name, ss.name ";
        
    }

    
    
	query.statements.push({"statement":statementSt});

	var xhr = new XMLHttpRequest();    
	xhr.onloadend = onLoadEnd;
	xhr.open("POST", serverURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json; charset=UTF-8');
	xhr.send(JSON.stringify(query));
}

function getOffsetsForPeriod(serverURL, periodName, powerFlagValue,  onLoadEnd){
        
    var query = {
	    "statements" : [ ]
	};
    
    var statementSt;
    
    if(powerFlagValue == 'Include Power installations'){
        
        statementSt = "MATCH (c:COUNTRY)<-[:INSTALLATION_COUNTRY|AIRCRAFT_OPERATOR_COUNTRY]-(node)-[:INSTALLATION_SECTOR|AIRCRAFT_OPERATOR_SECTOR]->(s:SECTOR)<-[:AGGREGATES_SECTOR]-(ss:SANDBAG_SECTOR)," +
                        "(node)-[off:OFFSETS]->(o:OFFSET)-[:OFFSET_PERIOD]->(p:PERIOD) " +
                       "WHERE p.name IN " + periodName + " " + " AND (o.unit_type = 'ERU' " +
					   "OR o.unit_type = 'CER') RETURN sum(o.amount) AS Offsets, c.name, ss.name, p.name ORDER BY c.name, ss.name";
        
    }else if(powerFlagValue == 'Exclude Power installations'){
          
        statementSt = "MATCH (c:COUNTRY)<-[:INSTALLATION_COUNTRY|AIRCRAFT_OPERATOR_COUNTRY]-(node)-[:INSTALLATION_SECTOR|AIRCRAFT_OPERATOR_SECTOR]->(s:SECTOR)<-[:AGGREGATES_SECTOR]-(ss:SANDBAG_SECTOR)," +
                        "(node)-[off:OFFSETS]->(o:OFFSET)-[:OFFSET_PERIOD]->(p:PERIOD) " +
                       "WHERE p.name IN " + periodName + " " + " AND (o.unit_type = 'ERU' " +
					   "OR o.unit_type = 'CER') AND node.power_flag <> 'true' RETURN sum(o.amount) AS Offsets, c.name, ss.name, p.name ORDER BY c.name, ss.name";
        
    }else if(powerFlagValue == 'Show only Power installations'){
        
        statementSt = "MATCH (c:COUNTRY)<-[:INSTALLATION_COUNTRY|AIRCRAFT_OPERATOR_COUNTRY]-(node)-[:INSTALLATION_SECTOR|AIRCRAFT_OPERATOR_SECTOR]->(s:SECTOR)<-[:AGGREGATES_SECTOR]-(ss:SANDBAG_SECTOR)," +
                        "(node)-[off:OFFSETS]->(o:OFFSET)-[:OFFSET_PERIOD]->(p:PERIOD) " +
                       "WHERE p.name IN " + periodName + " " + " AND (o.unit_type = 'ERU' " +
					   "OR o.unit_type = 'CER') AND node.power_flag = 'true' RETURN sum(o.amount) AS Offsets, c.name, ss.name, p.name ORDER BY c.name, ss.name";
    }

	query.statements.push({"statement":statementSt});

	var xhr = new XMLHttpRequest();    
	xhr.onloadend = onLoadEnd;
	xhr.open("POST", serverURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json; charset=UTF-8');
	xhr.send(JSON.stringify(query));
}

function getSurrenderedUnitsForPeriod(serverURL, periodName, onLoadEnd){
        
    var query = {
	    "statements" : [ ]
	};

	var statementSt = "MATCH (c:COUNTRY)<-[:INSTALLATION_COUNTRY]-(i:INSTALLATION)-[:INSTALLATION_SECTOR]->(s:SECTOR)," +
                        "(i)-[su:SURRENDERED_UNITS]->(p:PERIOD) " +
                       "WHERE p.name = '" + periodName + "' " +
					   "RETURN sum(su.value) AS Surrendered_Units, c.name, s.name ORDER BY c.name, s.name";
    
    //console.log("statement!", statementSt);

	query.statements.push({"statement":statementSt});

	var xhr = new XMLHttpRequest();    
	xhr.onloadend = onLoadEnd;
	xhr.open("POST", serverURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json; charset=UTF-8');
	xhr.send(JSON.stringify(query));
}

function getInstallationData(serverURL, installationID, onLoadEnd){
    var query = {
	    "statements" : [ ]
	};

	var statementSt = "MATCH (i:INSTALLATION) WHERE i.id = '" + installationID + "' " +
                        "RETURN i.id, i.name, i.city, i.post_code, i.address, i.EPRTR_ID, i.permit_id, permit_entry_date, " +
                        "permit_expiry_or_revocation_date, i.latitude, i.longitude, i.power_flag, i.power_flag_reason";
    
	query.statements.push({"statement":statementSt});

	var xhr = new XMLHttpRequest();    
	xhr.onloadend = onLoadEnd;
	xhr.open("POST", serverURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json; charset=UTF-8');
	xhr.send(JSON.stringify(query));
}

function getInstallationsForCountryAndSectorOffsets(serverURL, countryNames, sectorNames, isSandbagSector, powerFlag, periodNames,  onLoadEnd){
    var query = {
	    "statements" : [ ]
	};
    
    var statementSt;
    
    if(isSandbagSector){
        
        if(powerFlag == "Include Power installations"){
            
            statementSt = "MATCH (c:COUNTRY)<-[:INSTALLATION_COUNTRY|AIRCRAFT_OPERATOR_COUNTRY]-(node)-[:INSTALLATION_SECTOR|AIRCRAFT_OPERATOR_SECTOR]->(s:SECTOR)<-[:AGGREGATES_SECTOR]-(ss:SANDBAG_SECTOR), (node)-[off:OFFSETS]->(o:OFFSET)-[:OFFSET_PERIOD]->(p:PERIOD) " +  
                "WHERE c.name IN " + countryNames + " AND ss.name IN " + sectorNames + " AND (node:INSTALLATION OR node:AIRCRAFT_OPERATOR) AND node.latitude <> '0' AND node.latitude <> '' AND node.longitude <> '0' AND node.longitude <> '' AND p.name IN " + periodNames + " AND (o.unit_type = 'ERU' OR o.unit_type = 'CER')" +
					   " RETURN node.id, node.name, node.latitude, node.longitude, ss.name, node.city, node.address, sum(o.amount)";
            
        }else if(powerFlag == "Exclude Power installations"){
            
            statementSt = "MATCH (c:COUNTRY)<-[:INSTALLATION_COUNTRY|AIRCRAFT_OPERATOR_COUNTRY]-(node)-[:INSTALLATION_SECTOR|AIRCRAFT_OPERATOR_SECTOR]->(s:SECTOR)<-[:AGGREGATES_SECTOR]-(ss:SANDBAG_SECTOR), (node)-[off:OFFSETS]->(o:OFFSET)-[:OFFSET_PERIOD]->(p:PERIOD)" +  
                "WHERE c.name IN " + countryNames + " AND ss.name IN " + sectorNames + " AND (node:INSTALLATION OR node:AIRCRAFT_OPERATOR) AND node.latitude <> '0' AND node.latitude <> '' AND node.longitude <> '0' AND node.longitude <> '' AND p.name IN " + periodNames + " AND node.power_flag <> 'true'" +
                " AND (o.unit_type = 'ERU' OR o.unit_type = 'CER')" +
					   "RETURN node.id, node.name, node.latitude, node.longitude, ss.name, node.city, node.address, sum(o.amount)";
            
        }else if(powerFlag == "Show only Power installations"){            
            
            statementSt = "MATCH (c:COUNTRY)<-[:INSTALLATION_COUNTRY|AIRCRAFT_OPERATOR_COUNTRY]-(node)-[:INSTALLATION_SECTOR|AIRCRAFT_OPERATOR_SECTOR]->(s:SECTOR)<-[:AGGREGATES_SECTOR]-(ss:SANDBAG_SECTOR), (node)-[off:OFFSETS]->(o:OFFSET)-[:OFFSET_PERIOD]->(p:PERIOD) " +  
                "WHERE c.name IN " + countryNames + " AND ss.name IN " + sectorNames + " AND (node:INSTALLATION OR node:AIRCRAFT_OPERATOR) AND node.latitude <> '0' AND node.latitude <> '' AND node.longitude <> '0' AND node.longitude <> '' AND p.name IN " + periodNames +   " AND node.power_flag = 'true'" +
                " AND (o.unit_type = 'ERU' OR o.unit_type = 'CER')" +
                "RETURN node.id, node.name, node.latitude, node.longitude, ss.name, node.city, node.address, sum(o.amount)";
        }        
        
    }	

	//console.log(statementSt);

	query.statements.push({"statement":statementSt});

	var xhr = new XMLHttpRequest();    
	xhr.onloadend = onLoadEnd;
	xhr.open("POST", serverURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json; charset=UTF-8');
	xhr.send(JSON.stringify(query));
}

function getInstallationsForCountryAndSector(serverURL, countryNames, sectorNames, isSandbagSector, powerFlag, periodNames,  onLoadEnd){
    var query = {
	    "statements" : [ ]
	};
    
    var statementSt;
    
    if(isSandbagSector){
        
        if(powerFlag == "Include Power installations"){
            
            statementSt = "MATCH (c:COUNTRY)<-[:INSTALLATION_COUNTRY|AIRCRAFT_OPERATOR_COUNTRY]-(node)-[:INSTALLATION_SECTOR|AIRCRAFT_OPERATOR_SECTOR]->(s:SECTOR)<-[:AGGREGATES_SECTOR]-(ss:SANDBAG_SECTOR), (node)-[ve:VERIFIED_EMISSIONS]->(p:PERIOD), (node)-[aa:ALLOWANCES_IN_ALLOCATION]->(p:PERIOD) " +  
                "WHERE c.name IN " + countryNames + " AND ss.name IN " + sectorNames + " AND (node:INSTALLATION OR node:AIRCRAFT_OPERATOR) AND node.latitude <> '0' AND node.latitude <> '' AND node.longitude <> '0' AND node.longitude <> '' AND p.name IN " + periodNames + 
					   " RETURN node.id, node.name, node.latitude, node.longitude, ss.name, node.city, node.address, sum(ve.value), sum(aa.value)";
            
        }else if(powerFlag == "Exclude Power installations"){
            
            statementSt = "MATCH (c:COUNTRY)<-[:INSTALLATION_COUNTRY|AIRCRAFT_OPERATOR_COUNTRY]-(node)-[:INSTALLATION_SECTOR|AIRCRAFT_OPERATOR_SECTOR]->(s:SECTOR)<-[:AGGREGATES_SECTOR]-(ss:SANDBAG_SECTOR), (node)-[ve:VERIFIED_EMISSIONS]->(p:PERIOD), (node)-[aa:ALLOWANCES_IN_ALLOCATION]->(p:PERIOD)" +  
                "WHERE c.name IN " + countryNames + " AND ss.name IN " + sectorNames + " AND (node:INSTALLATION OR node:AIRCRAFT_OPERATOR) AND node.latitude <> '0' AND node.latitude <> '' AND node.longitude <> '0' AND node.longitude <> '' AND p.name IN " + periodNames + " AND node.power_flag <> 'true'" +
					   "RETURN node.id, node.name, node.latitude, node.longitude, ss.name, node.city, node.address, sum(ve.value), sum(aa.value)";
            
        }else if(powerFlag == "Show only Power installations"){            
            
            statementSt = "MATCH (c:COUNTRY)<-[:INSTALLATION_COUNTRY|AIRCRAFT_OPERATOR_COUNTRY]-(node)-[:INSTALLATION_SECTOR|AIRCRAFT_OPERATOR_SECTOR]->(s:SECTOR)<-[:AGGREGATES_SECTOR]-(ss:SANDBAG_SECTOR), (node)-[ve:VERIFIED_EMISSIONS]->(p:PERIOD), (node)-[aa:ALLOWANCES_IN_ALLOCATION]->(p:PERIOD) " +  
                "WHERE c.name IN " + countryNames + " AND ss.name IN " + sectorNames + " AND (node:INSTALLATION OR node:AIRCRAFT_OPERATOR) AND node.latitude <> '0' AND node.latitude <> '' AND node.longitude <> '0' AND node.longitude <> '' AND p.name IN " + periodNames +   " AND node.power_flag = 'true'" +
					   "RETURN node.id, node.name, node.latitude, node.longitude, ss.name, node.city, node.address, sum(ve.value), sum(aa.value)";
        }        
        
    }	

	//console.log(statementSt);

	query.statements.push({"statement":statementSt});

	var xhr = new XMLHttpRequest();    
	xhr.onloadend = onLoadEnd;
	xhr.open("POST", serverURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json; charset=UTF-8');
	xhr.send(JSON.stringify(query));
}

function getVerifiedEmissionsForCountryAndSector(serverURL, countryNames, sectorNames, isSandbagSector, powerFlag, initialPeriod, onLoadEnd ){
    var query = {
	    "statements" : [ ]
	};
    
    var statementSt;
    
    if(isSandbagSector){
        
        if(powerFlag == "Include Power installations"){
            
            statementSt = "MATCH (c:COUNTRY)<-[:INSTALLATION_COUNTRY|AIRCRAFT_OPERATOR_COUNTRY]-(node)-[:INSTALLATION_SECTOR|AIRCRAFT_OPERATOR_SECTOR]->(s:SECTOR)<-[:AGGREGATES_SECTOR]-(ss:SANDBAG_SECTOR)," +
                        "(node)-[ve:VERIFIED_EMISSIONS]->(p:PERIOD)" +
                       "WHERE c.name IN " + countryNames + " AND ss.name IN " + sectorNames + " AND (node:INSTALLATION OR node:AIRCRAFT_OPERATOR) AND toInt(p.name) >= " + initialPeriod + " " +
					   "RETURN sum(ve.value) AS Verified_Emissions, p.name ORDER BY p.name";
            
        }else if(powerFlag == "Exclude Power installations"){
            
            statementSt = "MATCH (c:COUNTRY)<-[:INSTALLATION_COUNTRY|AIRCRAFT_OPERATOR_COUNTRY]-(node)-[:INSTALLATION_SECTOR|AIRCRAFT_OPERATOR_SECTOR]->(s:SECTOR)<-[:AGGREGATES_SECTOR]-(ss:SANDBAG_SECTOR)," +
                        "(node)-[ve:VERIFIED_EMISSIONS]->(p:PERIOD)" +
                       "WHERE c.name IN " + countryNames + " AND ss.name IN " + sectorNames + " AND (node:INSTALLATION OR node:AIRCRAFT_OPERATOR) AND node.power_flag <> 'true' AND toInt(p.name) >= " + initialPeriod +
					   " RETURN sum(ve.value) AS Verified_Emissions, p.name ORDER BY p.name";
            
            
        }else if(powerFlag == "Show only Power installations"){
            
            statementSt = "MATCH (c:COUNTRY)<-[:INSTALLATION_COUNTRY|AIRCRAFT_OPERATOR_COUNTRY]-(node)-[:INSTALLATION_SECTOR|AIRCRAFT_OPERATOR_SECTOR]->(s:SECTOR)<-[:AGGREGATES_SECTOR]-(ss:SANDBAG_SECTOR)," +
                        "(node)-[ve:VERIFIED_EMISSIONS]->(p:PERIOD)" +
                       "WHERE c.name IN " + countryNames + " AND ss.name IN " + sectorNames + " AND (node:INSTALLATION OR node:AIRCRAFT_OPERATOR) AND (node.power_flag = 'true') AND toInt(p.name) >= " + initialPeriod + 
					   " RETURN sum(ve.value) AS Verified_Emissions, p.name ORDER BY p.name";
            
        }
              
    }else{
        statementSt = "MATCH (c:COUNTRY)<-[:INSTALLATION_COUNTRY|AIRCRAFT_OPERATOR_COUNTRY]-(node)-[:INSTALLATION_SECTOR|AIRCRAFT_OPERATOR_SECTOR]->(s:SECTOR)," +
                        "(node)-[ve:VERIFIED_EMISSIONS]->(p:PERIOD)" +
                       "WHERE c.name IN " + countryNames + " AND s.name IN " + sectorNames + " AND (node:INSTALLATION OR node:AIRCRAFT_OPERATOR) AND toInt(p.name) >= " + initialPeriod +
					   " RETURN sum(ve.value) AS Verified_Emissions, p.name ORDER BY p.name";
    }

	

	//console.log(statementSt);

	query.statements.push({"statement":statementSt});

	var xhr = new XMLHttpRequest();    
	xhr.onloadend = onLoadEnd;
	xhr.open("POST", serverURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json; charset=UTF-8');
	xhr.send(JSON.stringify(query));
}


function getOffsetsForCountryAndSector(serverURL, countryNames, sectorNames, isSandbagSector, powerFlag, initialPeriod, onLoadEnd ){
    var query = {
	    "statements" : [ ]
	};

	var statementSt;
    
    if(isSandbagSector){
        
        if(powerFlag == "Include Power installations"){
            
            statementSt = "MATCH (c:COUNTRY)<-[:INSTALLATION_COUNTRY|AIRCRAFT_OPERATOR_COUNTRY]-(node)-[:INSTALLATION_SECTOR|AIRCRAFT_OPERATOR_SECTOR]->(s:SECTOR)<-[:AGGREGATES_SECTOR]-(ss:SANDBAG_SECTOR)" +
					   ", (node)-[off:OFFSETS]->(o:OFFSET)-[:OFFSET_PERIOD]->(p:PERIOD) " +
                       "WHERE c.name IN " + countryNames + " AND ss.name IN " + sectorNames + " AND (o.unit_type = 'ERU' " +
					   "OR o.unit_type = 'CER') AND (node:INSTALLATION OR node:AIRCRAFT_OPERATOR) AND toInt(p.name) >= " + initialPeriod + " RETURN sum(o.amount) AS Offsets, p.name ORDER BY p.name";
            
        }else if(powerFlag == "Exclude Power installations"){
            
            statementSt = "MATCH (c:COUNTRY)<-[:INSTALLATION_COUNTRY|AIRCRAFT_OPERATOR_COUNTRY]-(node)-[:INSTALLATION_SECTOR|AIRCRAFT_OPERATOR_SECTOR]->(s:SECTOR)<-[:AGGREGATES_SECTOR]-(ss:SANDBAG_SECTOR)" +
					   ", (node)-[off:OFFSETS]->(o:OFFSET)-[:OFFSET_PERIOD]->(p:PERIOD) " +
                       "WHERE c.name IN " + countryNames + " AND ss.name IN " + sectorNames + " AND (o.unit_type = 'ERU' " +
					   "OR o.unit_type = 'CER') AND (node:INSTALLATION OR node:AIRCRAFT_OPERATOR) AND node.power_flag <> 'true'  AND toInt(p.name) >= " + initialPeriod + " RETURN sum(o.amount) AS Offsets, p.name ORDER BY p.name";
            
            
        }else if(powerFlag == "Show only Power installations"){
            
            statementSt = "MATCH (c:COUNTRY)<-[:INSTALLATION_COUNTRY|AIRCRAFT_OPERATOR_COUNTRY]-(node)-[:INSTALLATION_SECTOR|AIRCRAFT_OPERATOR_SECTOR]->(s:SECTOR)<-[:AGGREGATES_SECTOR]-(ss:SANDBAG_SECTOR)" +
					   ", (node)-[off:OFFSETS]->(o:OFFSET)-[:OFFSET_PERIOD]->(p:PERIOD) " +
                       "WHERE c.name IN " + countryNames + " AND ss.name IN " + sectorNames + " AND (o.unit_type = 'ERU' " +
					   "OR o.unit_type = 'CER') AND (node:INSTALLATION OR node:AIRCRAFT_OPERATOR) AND node.power_flag = 'true'  AND toInt(p.name) >= " + initialPeriod + " RETURN sum(o.amount) AS Offsets, p.name ORDER BY p.name";
        }
        
        
    }else{
        statementSt = "MATCH (c:COUNTRY)<-[:INSTALLATION_COUNTRY|AIRCRAFT_OPERATOR_COUNTRY]-(node)-[:INSTALLATION_SECTOR|AIRCRAFT_OPERATOR_SECTOR]->(s:SECTOR)" +
					   ", (node)-[off:OFFSETS]->(o:OFFSET)-[:OFFSET_PERIOD]->(p:PERIOD) " +
                       "WHERE c.name IN " + countryNames + " AND s.name IN " + sectorNames + " AND (o.unit_type = 'ERU' " +
					   "OR o.unit_type = 'CER') AND (node:INSTALLATION OR node:AIRCRAFT_OPERATOR) AND toInt(p.name) >= " + initialPeriod + " RETURN sum(o.amount) AS Offsets, p.name ORDER BY p.name";
    }
    

	//console.log(statementSt);

	query.statements.push({"statement":statementSt});

	var xhr = new XMLHttpRequest();    
	xhr.onloadend = onLoadEnd;
	xhr.open("POST", serverURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json; charset=UTF-8');
	xhr.send(JSON.stringify(query));
}


function getFreeAllocationForCountryAndSector(serverURL, countryNames, sectorNames, isSandbagSector, powerFlag, initialPeriod, onLoadEnd ){

	var query = {
	    "statements" : [ ]
	};

	var statementSt;
    
    if(isSandbagSector){
        
        if(powerFlag == "Include Power installations"){
            
            statementSt= "MATCH (c:COUNTRY)<-[:INSTALLATION_COUNTRY|AIRCRAFT_OPERATOR_COUNTRY]-(node)-[:INSTALLATION_SECTOR|AIRCRAFT_OPERATOR_SECTOR]->(s:SECTOR)<-[:AGGREGATES_SECTOR]-(ss:SANDBAG_SECTOR)," +
                        "(node)-[fa:ALLOWANCES_IN_ALLOCATION]->(p:PERIOD) " +
                        "WHERE c.name IN " + countryNames + " AND ss.name IN " + sectorNames + " AND (node:INSTALLATION OR node:AIRCRAFT_OPERATOR) AND toInt(p.name) >= " + initialPeriod +
					   " RETURN sum(fa.value) AS Free_Allocation, p.name ORDER BY p.name";            
            
        }else if(powerFlag == "Exclude Power installations"){
            
            statementSt= "MATCH (c:COUNTRY)<-[:INSTALLATION_COUNTRY|AIRCRAFT_OPERATOR_COUNTRY]-(node)-[:INSTALLATION_SECTOR|AIRCRAFT_OPERATOR_SECTOR]->(s:SECTOR)<-[:AGGREGATES_SECTOR]-(ss:SANDBAG_SECTOR)," +
                        "(node)-[fa:ALLOWANCES_IN_ALLOCATION]->(p:PERIOD) " +
                        "WHERE c.name IN " + countryNames + " AND ss.name IN " + sectorNames + " AND (node:INSTALLATION OR node:AIRCRAFT_OPERATOR) AND node.power_flag <> 'true' AND toInt(p.name) >= " + initialPeriod +
					   " RETURN sum(fa.value) AS Free_Allocation, p.name ORDER BY p.name";     
            
        }else if(powerFlag == "Show only Power installations"){
            
            statementSt= "MATCH (c:COUNTRY)<-[:INSTALLATION_COUNTRY|AIRCRAFT_OPERATOR_COUNTRY]-(node)-[:INSTALLATION_SECTOR|AIRCRAFT_OPERATOR_SECTOR]->(s:SECTOR)<-[:AGGREGATES_SECTOR]-(ss:SANDBAG_SECTOR)," +
                        "(node)-[fa:ALLOWANCES_IN_ALLOCATION]->(p:PERIOD) " +
                        "WHERE c.name IN " + countryNames + " AND ss.name IN " + sectorNames + " AND (node:INSTALLATION OR node:AIRCRAFT_OPERATOR) AND node.power_flag = 'true' AND toInt(p.name) >= " + initialPeriod +
					   " RETURN sum(fa.value) AS Free_Allocation, p.name ORDER BY p.name"; 
            
        }
        
        
    }else{
        statementSt= "MATCH (c:COUNTRY)<-[:INSTALLATION_COUNTRY|AIRCRAFT_OPERATOR_COUNTRY]-(node)-[:INSTALLATION_SECTOR|AIRCRAFT_OPERATOR_SECTOR]->(s:SECTOR)," +
                        "(node)-[fa:ALLOWANCES_IN_ALLOCATION]->(p:PERIOD) " +
                        "WHERE c.name IN " + countryNames + " AND s.name IN " + sectorNames + " AND (node:INSTALLATION OR node:AIRCRAFT_OPERATOR) AND toInt(p.name) >= " + initialPeriod + 
					   " RETURN sum(fa.value) AS Free_Allocation, p.name ORDER BY p.name";
    }
    
    

	//console.log(statementSt);

	query.statements.push({"statement":statementSt});

	var xhr = new XMLHttpRequest();    
	xhr.onloadend = onLoadEnd;
	xhr.open("POST", serverURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json; charset=UTF-8');
	xhr.send(JSON.stringify(query));
}





