(function(w,d){
    w.typeahead = (element,config) => {
        new Typeahead(element,config);
    }
    class Typeahead {
        constructor(element,config) {
            Object.assign(this,{element,config});
            this.render();
            this.setEventListeners();
        }
        render() {
            this.selectedSuggestionsDiv = document.createElement('div');
            this.element.appendChild(this.selectedSuggestionsDiv);
            this.selectedSuggestions = [];
            this.input = document.createElement('input');
            this.element.appendChild(this.input);
            this.suggesionsDiv = document.createElement('div');
            this.element.appendChild(this.suggesionsDiv);
        }
        suggestionSelected(selectedElement) {
            this.selectedSuggestions.push(selectedElement.attributes.tadata);
            this.addSelectedSuggestion(selectedElement.attributes.tadata);
        }
        addSelectedSuggestion(text) {
            let ss = document.createElement('div');
            ss.className = "chip";
            ss.innerText = text;
            this.selectedSuggestionsDiv.appendChild(ss);
        }
        setEventListeners() {
            this.input.addEventListener('keyup',(e)=>{
                this.renderSuggestions(this.getSuggestions(e.target.value));
            });
            this.suggesionsDiv.addEventListener('click',(e)=>{
                this.suggestionSelected(e.target);
            });
        }
        emptySuggestionsDiv () {
            var child = this.suggesionsDiv.lastElementChild;  
            while (child) { 
                this.suggesionsDiv.removeChild(child); 
                child = this.suggesionsDiv.lastElementChild; 
            }
        }
        renderSuggestions(suggestions) {
            this.emptySuggestionsDiv();
            suggestions.map((sug)=>{
                let suggestionRow = document.createElement('div');
                suggestionRow.innerText = `${sug[this.config.searchField]} - ${sug[this.config.displayField]}`;
                suggestionRow.attributes.tadata = sug[this.config.searchField];
                this.suggesionsDiv.appendChild(suggestionRow);
            });
        }
        getSuggestions(text) {
            if(!text) return [];
            return this.config.allSuggestionData.filter((countryData)=>{
                return countryData[this.config.searchField].indexOf(text)>-1;
            });
        }
    
    }
})(window,document);




