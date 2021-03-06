<fieldset id="fieldset--type">
    <legend>CANCER TYPE/CONDITION</legend>
    <a href="/about-cancer/treatment/clinical-trials/search/help#cancertype" class="text-icon-help" target="_blank" aria-label="Help">?</a>

    <div>Select a cancer type or condition. Select additional options, if applicable.</div>
    <div class="field-group">
        <label id="ct-label" for="ct-select">Primary Cancer Type/Condition</label>
        <select id="ct-select" class="no-auto-jqueryui" name="t"><option value="">All</option></select>
    </div>
    <div id="other-diseases" class="disabled">
        <div class="field-group">
            <label id="st-label" for="st-multiselect">Subtype</label>
            <select id="st-multiselect" name="st" multiple data-placeholder="Select a subtype" placeholder="Select cancer type first" disabled></select>
        </div>
        <div class="field-group">
            <label id="stg-label" for="stg-multiselect">Stage</label>
            <select id="stg-multiselect" name="stg" multiple data-placeholder="Select a stage" placeholder="Select cancer type or subtype first" disabled></select>
        </div>
        <!--(bake-start _if="findings")-->
        <div class="field-group">
            <label id="fin-label" for="fin-multiselect">Side Effects/Biomarkers/Participant Attributes</label>
            <select id="fin-multiselect" name="fin" multiple data-placeholder="Examples: Nausea, BRCA1" placeholder="Select cancer type or subtype first" disabled></select>
        </div>
        <!--(bake-end)-->
    </div>
</fieldset>