import * as TypeMoq from 'typemoq';

import { ClinicalTrialsService, TermResults, DiseaseResult, DiseaseResults, TermResult, InterventionResults, InterventionResult } from '../../../../../_src/Scripts/NCI/Services/clinical-trials';
import { CTAPIFacade } from '../../../../../_src/Scripts/NCI/UX/AppModuleSpecific/BasicCTS/Common/ctapi-facade';

const VIEWABLE_TRIALS:string[] = [
    "Active",
    "Approved", 
    "Enrolling by Invitation",
    "In Review",
    "Temporarily Closed to Accrual",
    "Temporarily Closed to Accrual and Intervention"
];

const COUNTRY_KEY:string = "sites.org_country";
const HOSPITAL_KEY:string = "sites.org_name";
const TRIAL_INVESTIGATORS_KEY:string = "principal_investigator";
const LEAD_ORG_KEY:string = "lead_org";

/**
 * Mock Service for tests
 */
class MockCTService implements ClinicalTrialsService {

    constructor() {}

    getTerms(termType: string, additionalParams?:any, size?:number, from?:number): Promise<TermResults> {
        let res:TermResults = new TermResults();
        res.total = 0;
        res.terms = [];
        return Promise.resolve(res);
    }

    getInterventions(category?: string|string[], name?: string, size?:number, additionalParams?:any, sort?:string, order?:string): Promise<InterventionResults> {
        let res:InterventionResults = new InterventionResults();
        res.total = 0;
        res.terms = [];
        return Promise.resolve(res);
    }
    getDiseases(menuType:string|string[], diseaseAncestorIDs?:string | string[], additionalParams?:any): Promise<DiseaseResults> {
        let res:DiseaseResults = new DiseaseResults();
        res.total = 0;
        res.terms = [];
        return Promise.resolve(res);
    }

}

/**
 * Gets a Mock for testing parameters - Could also be used for other testing.
 * @param checkParamCallback A callback to inspect the parameters
 * @param results A TermResults object to return
 */
function getTermsParameterTestMock(
    checkParamCallback: (termType: string, additionalParams?:any, size?:number, from?:number) => void,
    results:TermResults
) : TypeMoq.IMock<ClinicalTrialsService> {
    //Create the fake interface implementation.
    let mock: TypeMoq.IMock<ClinicalTrialsService> = TypeMoq.Mock.ofType(MockCTService);

    //Setup the getTerms method to say if any string, etc is passed in then... 
    mock.setup(m => m.getTerms(
        TypeMoq.It.isAnyString(),
        TypeMoq.It.isAny(), //Undefined is not a string, so must allow any
        TypeMoq.It.isAny(), //Can be a number or can be undefined
        TypeMoq.It.isAny()  //Can be a number or can be undefined
    ))
    //... then run this callback intercepting the request...
    .callback(checkParamCallback)
    // ...finally returning a promise just like a real implementation of a CTAPIConnection would.
    .returns(() => Promise.resolve(results));

    return mock;
}

/**
 * Gets a Mock for testing /disease parameters - Could also be used for other testing.
 * @param checkParamCallback A callback to inspect the parameters
 * @param results A DiseaseResults object to return
 */
function getDiseaseParameterTestMock(
    checkParamCallback: (menuType: string | string[], diseaseAncestorIDs?: string | string[], additionalParams?:any) => void,
    results:DiseaseResults
) : TypeMoq.IMock<ClinicalTrialsService> {
    //Create the fake interface implementation.
    let mock: TypeMoq.IMock<ClinicalTrialsService> = TypeMoq.Mock.ofType(MockCTService);

    //Setup the getTerms method to say if any string, etc is passed in then... 
    mock.setup(m => m.getDiseases(
        TypeMoq.It.isAny(), //String or array of strings.
        TypeMoq.It.isAny(), //Undefined is not a string, so must allow any; undefined, string or array of strings.
        TypeMoq.It.isAny() //Object for additional Parameters.
    ))
    //... then run this callback intercepting the request...
    .callback(checkParamCallback)
    // ...finally returning a promise just like a real implementation of a CTAPIConnection would.
    .returns(() => Promise.resolve(results));

    return mock;
}

/**
 * Gets a Mock for testing /interventions parameters - Could also be used for other testing.
 * @param checkParamCallback A callback to inspect the parameters
 * @param results A DiseaseResults object to return
 */
function getInterventionsParameterTestMock(
    checkParamCallback: (category?: string | string[], name?: string, size?: number, additionalParams?:any, sort?: string, order?: string) => void,
    results:InterventionResults
) : TypeMoq.IMock<ClinicalTrialsService> {
    //Create the fake interface implementation.
    let mock: TypeMoq.IMock<ClinicalTrialsService> = TypeMoq.Mock.ofType(MockCTService);

    //Setup the getTerms method to say if any string, etc is passed in then... 
    mock.setup(m => m.getInterventions(
        TypeMoq.It.isAny(), //String or array of strings.
        TypeMoq.It.isAny(), //undefined or string 
        TypeMoq.It.isAny(), //undefined or number
        TypeMoq.It.isAny(), //Object for additional parameters
        TypeMoq.It.isAny(), //undefined or string
        TypeMoq.It.isAny() //undefined or string
    ))
    //... then run this callback intercepting the request...
    .callback(checkParamCallback)
    // ...finally returning a promise just like a real implementation of a CTAPIConnection would.
    .returns(() => Promise.resolve(results));

    return mock;
}


/**
 * Gets a Term Result with properties filled in.
 */
function getTermResult(termKey:string, termType:string, term:string, count:number, codes:string[]): TermResult {
    let rtn:TermResult = new TermResult();

    rtn.termKey = termKey;
    rtn.termType = termType;
    rtn.term = term;
    rtn.count = count;
    rtn.codes = codes;

    return rtn;
}

/**
 * Gets a Disease Result with properties filled in.
 */
function getDiseaseResult(name:string, codes:string[], parentDiseaseID:string, menu:string): DiseaseResult {
    let rtn:DiseaseResult = new DiseaseResult();

    rtn.name = name;
    rtn.codes = codes;
    rtn.parentDiseaseID = parentDiseaseID;
    rtn.menu = menu;

    return rtn;
}

/**
 * Gets a Disease Result with properties filled in.
 */
function getInterventionResult(category: string, name: string, codes:string[], synonyms: string[], type: string): InterventionResult {
    let rtn:InterventionResult = new InterventionResult();

    rtn.category = category;
    rtn.name = name;
    rtn.codes = codes;
    rtn.synonyms = synonyms;
    rtn.type = type;

    return rtn;
}

describe('UX.AppModuleSpecific.BasicCTS.Common.CTAPIFacade', () => {

    describe('getCountries', () => {

        it('should make the correct request to the ClinicalTrialsService', () => {

            let res:TermResults = new TermResults();
            res.total = 0;
            res.terms = [];            

            let svcMock:TypeMoq.IMock<ClinicalTrialsService> = getTermsParameterTestMock(
                (termType: string, additionalParams?:any, size?:number, from?:number) => {
                    //Callback for assetions.
                    expect(termType).toBe(COUNTRY_KEY);
                    expect(size).toBe(100);
                    expect(additionalParams).toEqual({
                        sort: 'term',
                        current_trial_statuses: VIEWABLE_TRIALS
                    });
                    expect(from).toBeUndefined();
                },
                res
            );

            let facade:CTAPIFacade = new CTAPIFacade(svcMock.object);

            // TODO: change 'let' to return   
            let countries:Promise<string[]> = facade.getCountries();
        });

        it('should return the correct results based on response', () => {

            let res:TermResults = new TermResults();
            res.total = 2;
            
            res.terms.push(getTermResult(
                "argentina",
                COUNTRY_KEY,
                "Argentina",
                2,
                undefined
            ));

            res.terms.push(getTermResult(
                "australia",
                COUNTRY_KEY,
                "Australia",
                47,
                undefined
            ));

            let svcMock:TypeMoq.IMock<ClinicalTrialsService> = getTermsParameterTestMock(
                (termType: string, additionalParams?:any, size?:number, from?:number) => {
                    //Callback for assetions.
                    expect(termType).toBe("sites.org_country");
                    expect(size).toBe(100);
                    expect(additionalParams).toEqual({
                        sort: "term",
                        current_trial_statuses: VIEWABLE_TRIALS
                    });
                    expect(from).toBeUndefined();
                },
                res
            );

            let facade:CTAPIFacade = new CTAPIFacade(svcMock.object);

            //Mocha will handle promises when they are returned.  So you can
            //run the assertions in a then.
            return facade.getCountries()
                    .then((actual:string[]) => {
                        expect(actual).toEqual(["Argentina", "Australia"]);
                    });
        });

    });

    describe('searchHospital', () => {

        it('should make the correct request to the ClinicalTrialsService', () => {

            let res:TermResults = new TermResults();
            res.total = 0;
            res.terms = [];            

            let svcMock:TypeMoq.IMock<ClinicalTrialsService> = getTermsParameterTestMock(
                (termType: string, additionalParams?:any, size?:number, from?:number) => {
                    //Callback for assetions.
                    expect(termType).toBe(HOSPITAL_KEY);
                    expect(size).toBe(10);
                    expect(additionalParams).toEqual({
                        term: 'mayo',
                        sort: 'term',
                        current_trial_statuses: VIEWABLE_TRIALS
                    });
                    expect(from).toBeUndefined();
                },
                res
            );

            let facade:CTAPIFacade = new CTAPIFacade(svcMock.object);

            return facade.searchHospital('mayo'); 
        });

        it('should return the correct results based on response', () => {

            let res:TermResults = new TermResults();
            res.total = 1;
            
            res.terms.push(getTermResult(
                "mayo clinic in arizona",
                HOSPITAL_KEY,
                "Mayo Clinic in Arizona",
                240,
                undefined
            ));

            let svcMock:TypeMoq.IMock<ClinicalTrialsService> = getTermsParameterTestMock(
                (termType: string, additionalParams?:any, size?:number, from?:number) => {
                    //Callback for assetions.
                    expect(termType).toBe("sites.org_name");
                    expect(size).toBe(10);
                    expect(additionalParams).toEqual({
                        sort: "term",
                        term: "mayo clinic in arizona",
                        current_trial_statuses: VIEWABLE_TRIALS
                    });
                    expect(from).toBeUndefined();
                },
                res
            );

            let facade:CTAPIFacade = new CTAPIFacade(svcMock.object);

            //Mocha will handle promises when they are returned.  So you can
            //run the assertions in a then.
            return facade.searchHospital('mayo clinic in arizona')
                    .then((actual:TermResult[]) => {
                        expect(actual).toEqual(res.terms);
                    });
        });
    });

    describe('searchDrugs', () => {
        it('should make the correct request to the ClinicalTrialsService', () => {
            let res:InterventionResults = new InterventionResults();
            res.total = 0;
            res.terms = [];            

            let svcMock:TypeMoq.IMock<ClinicalTrialsService> = getInterventionsParameterTestMock(
                (category?: string | string[], name?: string, size?: number, additionalParams?:any, sort?: string, order?: string) => {
                    //Callback for assetions.
                    expect(category).toEqual(['Agent', 'Agent Category']);
                    expect(name).toBe('bev');
                    expect(size).toBe(10);
                    expect(additionalParams).toEqual({
                        current_trial_status: VIEWABLE_TRIALS
                    });
                },
                res
            );

            let facade:CTAPIFacade = new CTAPIFacade(svcMock.object);

            return facade.searchDrugs('bev'); 
        });

        it('should return the correct results based on response', () => {
            let res:InterventionResults = new InterventionResults();
            res.total = 1;
            
            res.terms.push(getInterventionResult(
                'agent',
                "Trastuzumab",
                [ "C1647" ],
                [
                    "Herceptin"
                ],
                undefined
            ));

            let svcMock:TypeMoq.IMock<ClinicalTrialsService> = getInterventionsParameterTestMock(
                (category?: string | string[], name?: string, size?: number, additionalParams?:any, sort?: string, order?: string) => {
                    //Callback for assetions.
                    expect(category).toEqual(['Agent', 'Agent Category']);
                    expect(name).toBe('Trastuzumab');
                    expect(size).toBe(10);
                    expect(additionalParams).toEqual({
                        current_trial_status: VIEWABLE_TRIALS
                    });
                },
                res
            );

            let facade:CTAPIFacade = new CTAPIFacade(svcMock.object);

            //Mocha will handle promises when they are returned.  So you can
            //run the assertions in a then.
            return facade.searchDrugs('Trastuzumab')
                    .then((actual:InterventionResult[]) => {
                        expect(actual).toEqual(res.terms);
                    });
        });

    });

    describe('searchOtherInterventions', () => {
        it('should make the correct request to the ClinicalTrialsService', () => {
            let res:InterventionResults = new InterventionResults();
            res.total = 0;
            res.terms = [];            

            let svcMock:TypeMoq.IMock<ClinicalTrialsService> = getInterventionsParameterTestMock(
                (category?: string | string[], name?: string, size?: number, additionalParams?:any, sort?: string, order?: string) => {
                    //Callback for assetions.
                    expect(category).toBe("Other");
                    expect(name).toBe('therapy');
                    expect(size).toBe(10);
                    expect(additionalParams).toEqual({
                        //name: 'therapy',
                        //sort: 'name',
                        current_trial_status: VIEWABLE_TRIALS
                    });
                },
                res
            );

            let facade:CTAPIFacade = new CTAPIFacade(svcMock.object);

            return facade.searchOtherInterventions('therapy'); 
        });

        it('should return the correct results based on response', () => {
            let res:InterventionResults = new InterventionResults();
            res.total = 1;
            
            res.terms.push(getInterventionResult(
                "Other",
                "Ablation Therapy",
                [ "C20985" ],
                [
                    "Ablation",
                    "Ablation Therapy",
                    "Local Ablation Therapy",
                    "Local Ablative Therapy"
                ],
                undefined
            ));

            let svcMock:TypeMoq.IMock<ClinicalTrialsService> = getInterventionsParameterTestMock(
                (category?: string | string[], name?: string, size?: number, additionalParams?:any, sort?: string, order?: string) => {
                    //Callback for assetions.
                    expect(category).toBe("Other");
                    expect(name).toBe('Ablation Therapy');
                    expect(size).toBe(10);
                    expect(additionalParams).toEqual({
                        current_trial_status: VIEWABLE_TRIALS
                    });
                },
                res
            );

            let facade:CTAPIFacade = new CTAPIFacade(svcMock.object);

            //Mocha will handle promises when they are returned.  So you can
            //run the assertions in a then.
            return facade.searchOtherInterventions('Ablation Therapy')
                    .then((actual:InterventionResult[]) => {
                        expect(actual).toEqual(res.terms);
                    });
        });
    });

    describe('getDiseasesForSimpleTypeAhead', () => {
        it('should make the correct request to the ClinicalTrialsService', () => {
            let res:DiseaseResults = new DiseaseResults();
            res.total = 0;
            res.terms = [];            

            let svcMock:TypeMoq.IMock<ClinicalTrialsService> = getDiseaseParameterTestMock(
                (menuType: string | string[], diseaseAncestorIDs?: string | string[], additionalParams?:any) => {
                    //Callback for assetions.
                    expect(menuType).toEqual(["maintype", "subtype", "stage"]);
                    expect(diseaseAncestorIDs).toBeUndefined();
                    expect(additionalParams).toEqual({
                        name: "breast",
                        size: 10,
                        sort: "cancergov",
                        current_trial_status: VIEWABLE_TRIALS
                    });
                },
                res
            );

            let facade:CTAPIFacade = new CTAPIFacade(svcMock.object);

            return facade.getDiseasesForSimpleTypeAhead('breast'); 
        });

        it('should return the correct results based on response', () => {
            let res:DiseaseResults = new DiseaseResults();
            res.total = 1;
            
            res.terms.push(getDiseaseResult(
                "Bilateral Breast Cancer",
                [ "C8272" ],
                "C4872",
                "subtype"
            ));

            let svcMock:TypeMoq.IMock<ClinicalTrialsService> = getDiseaseParameterTestMock(
                (menuType: string | string[], diseaseAncestorIDs?: string | string[], additionalParams?:any) => {
                    //Callback for assetions.
                    expect(menuType).toEqual(["maintype", "subtype", "stage"])
                    expect(diseaseAncestorIDs).toBeUndefined();
                    expect(additionalParams).toEqual({
                        name: "Bilateral Breast Cancer",
                        size: 10,
                        sort: "cancergov",
                        current_trial_status: VIEWABLE_TRIALS
                    });
                },
                res
            );

            let facade:CTAPIFacade = new CTAPIFacade(svcMock.object);

            //Mocha will handle promises when they are returned.  So you can
            //run the assertions in a then.
            return facade.getDiseasesForSimpleTypeAhead('Bilateral Breast Cancer')
                    .then((actual:DiseaseResult[]) => {
                        expect(actual).toEqual(res.terms);
                    });
        });
    }); 

    describe('searchTrialInvestigators', () => {

        it('should make the correct request to the ClinicalTrialsService', () => {

            let res:TermResults = new TermResults();
            res.total = 0;
            res.terms = [];            

            let svcMock:TypeMoq.IMock<ClinicalTrialsService> = getTermsParameterTestMock(
                (termType: string, additionalParams?:any, size?:number, from?:number) => {
                    //Callback for assetions.
                    expect(termType).toBe(TRIAL_INVESTIGATORS_KEY);
                    expect(size).toBe(10);
                    expect(additionalParams).toEqual({
                        term: 'david',
                        sort: 'term',
                        current_trial_statuses: VIEWABLE_TRIALS
                    });
                    expect(from).toBeUndefined();
                },
                res
            );

            let facade:CTAPIFacade = new CTAPIFacade(svcMock.object);

            return facade.searchTrialInvestigators('david'); 
        });

        it('should return the correct results based on response', () => {

            let res:TermResults = new TermResults();
            res.total = 1;
            
            res.terms.push(getTermResult(
                "david",
                TRIAL_INVESTIGATORS_KEY,
                "David Hui",
                8,
                undefined
            ));

            res.terms.push(getTermResult(
                "david",
                TRIAL_INVESTIGATORS_KEY,
                "David Eric Gerber",
                4,
                undefined
            ));

            let svcMock:TypeMoq.IMock<ClinicalTrialsService> = getTermsParameterTestMock(
                (termType: string, additionalParams?:any, size?:number, from?:number) => {
                    //Callback for assetions.
                    expect(termType).toBe("principal_investigator");
                    expect(size).toBe(10);
                    expect(additionalParams).toEqual({
                        sort: "term",
                        term: "david",
                        current_trial_statuses: VIEWABLE_TRIALS
                    });
                    expect(from).toBeUndefined();
                },
                res
            );

            let facade:CTAPIFacade = new CTAPIFacade(svcMock.object);

            //Mocha will handle promises when they are returned.  So you can
            //run the assertions in a then.
            return facade.searchTrialInvestigators('david')
                    .then((actual:TermResult[]) => {
                        expect(actual).toEqual(res.terms);
                    });
        });

    });

    describe('searchLeadOrgs', () => {

        it('should make the correct request to the ClinicalTrialsService', () => {

            let res:TermResults = new TermResults();
            res.total = 0;
            res.terms = [];            

            let svcMock:TypeMoq.IMock<ClinicalTrialsService> = getTermsParameterTestMock(
                (termType: string, additionalParams?:any, size?:number, from?:number) => {
                    //Callback for assetions.
                    expect(termType).toBe(LEAD_ORG_KEY);
                    expect(size).toBe(10);
                    expect(additionalParams).toEqual({
                        term: 'mayo',
                        sort: 'term',
                        current_trial_statuses: VIEWABLE_TRIALS
                    });
                    expect(from).toBeUndefined();
                },
                res
            );

            let facade:CTAPIFacade = new CTAPIFacade(svcMock.object);

            return facade.searchLeadOrg('mayo'); 
        });

    });

});