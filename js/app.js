var allSites=[];
var siteName=document.getElementById('siteName');
var siteURL=document.getElementById('siteURL');
var mood='submit';
var tmp;

if(localStorage.getItem('sites')!=null){
    allSites=JSON.parse(localStorage.getItem('sites'));
    showSites();
}
//add site
function addWeb(){
    var regex=/^https:\/\/(www{0,1}\.)?\w{1,}(\.com|\.net)\/$/;
    if(regex.test(siteURL.value)){
        var web={
            name:siteName.value,
            url:siteURL.value,
        };
        if(mood=='submit'){
            allSites.push(web);
        }else{
            allSites[tmp]=web;
            mood='submit';
            document.getElementById('submit').innerHTML='Submit';
        }
        
        console.log(allSites);
        localStorage.setItem('sites',JSON.stringify(allSites));
        showSites();
        deleteValue();
    }else{
        alert('Enter a valid URL');
    }
}


//show sites
function showSites() {
    var box=``;
    for(var i=0;i<allSites.length;i++){
        box+=`
        <tr>
        <td>${i+1}</td>
        <td>${allSites[i].name}</td>
        <td><a href="${allSites[i].url}" target="_blank"><button class="btn btn-info"> <i class="fa-solid fa-eye"></i> Visit</button></a></td>
        <td><button class="btn btn-secondary" onclick="updateSite(${i})"><i class="fa-solid fa-pen"></i> Update</button></td>
        <td><button class="btn btn-danger" onclick="deleteSites(${i})"><i class="fa-solid fa-trash"></i> Delete</button></td>
    </tr>    
        `
    }
    document.getElementById('sites').innerHTML=box;
}


//delete
function deleteSites(index) {
    allSites.splice(index,1);
    console.log(allSites);
    localStorage.setItem('sites',JSON.stringify(allSites));
    showSites();
}


//delete values
function deleteValue() {
    siteName.value="";
    siteURL.value="";
}


//update value
function updateSite(index) {
    siteName.value=allSites[index].name;
    siteURL.value=allSites[index].url;
    document.getElementById('submit').innerHTML='Update';
    tmp=index;
    mood='update';
}
