// (c) Microsoft. All rights reserved
//-----------------------
//
// Generate RANDOMly populated items...
//
//-----------------------

function setCommonData(item) {
    item.itemData.common.source = "HVTEST - Win8 Javascript Test";
    item.itemData.common.note = "Randomly Generated";
}

function makeAddress() {
    
    var address = new CHBase.Types.Address();
    address.street = new Array(
        "1234",
        "Princess Street"
    );
    address.city = "Edinburgh";
    address.postalCode = "ABCDEF";
    address.country = "Scotland";

    return address;
}

function makeEmail() {
}

function makeContact() {
    var contact = new CHBase.Types.Contact();
    var address = makeAddress();

    contact.address = new Array(
        address
    );

    contact.email = new Array(
        new CHBase.Types.Email("foo@bar.xyz")
    );
    contact.phone = new Array(
        new CHBase.Types.Phone("555-555-5555")
    );

    return contact;
}

function makePerson() {
    var person = new CHBase.Types.Person();
    person.name = new CHBase.Types.Name("Toby", "Riley", "McDuff");
    person.organization = "Justice League of Medicine";
    person.training = "MD, Phd, FRCS, PQRS";
    person.contact = makeContact();

    return person;
}

function makeAllergy() {
    var allergen = Array.randomItemFrom("Pollen", "Peanuts", "Penicillin", "Animal Dander", "Dust");

    var allergy = new CHBase.ItemTypes.Allergy(allergen);
    allergy.firstObserved = new CHBase.Types.ApproxDateTime();
    allergy.firstObserved.description = Array.randomItemFrom("In my teens", "As a child", "As an adult");
    allergy.reaction = new CHBase.Types.CodableValue(Array.randomItemFrom("anaphylactic shock", "sneezing", "Nausea"));

    return allergy;
}

function makeCondition() {
    var conditionName = Array.randomItemFrom("Migraine", "Pancreatitis", "Mild Depression", "Ulcer", "Asthma");

    var condition = new CHBase.ItemTypes.Condition(conditionName);
    condition.status = new CHBase.Types.CodableValue(Array.randomItemFrom("chronic", "acute"));
    if (Math.random() > 0.5) {
        condition.onsetDate = new CHBase.Types.ApproxDateTime(Date.random());
    }
    else {
        condition.onsetDate = new CHBase.Types.ApproxDateTime();
        condition.onsetDate.description = Array.randomItemFrom("As a teenager", "As a child");
    }

    setCommonData(condition);

    return condition;
}

function makeHeight() {

    var length = new CHBase.Types.LengthMeasurement();
    length.inInches = Math.randomIntInRange(60, 70);

    var height = new CHBase.ItemTypes.Height(CHBase.Types.StructuredDateTime.now(), length);

    setCommonData(height);

    return height;
}

function makeMedication() {
    
    var drugName = Array.randomItemFrom("Lipitor", "Ibuprofen", "Celebrex", "Prozac", "Claritin", "Viagra", "Omega 3 Supplement", "Multivitamin");

    var med = new CHBase.ItemTypes.Medication(drugName);
    med.dose = new CHBase.Types.ApproxMeasurement(Math.randomIntInRange(1, 4), "Tablets", "Tablets", "medication-strength-unit");
    med.strength = new CHBase.Types.ApproxMeasurement(Math.randomIntInRange(100, 1000), "Milligrams", "mg", "medication-strength-unit");
    med.frequency = new CHBase.Types.ApproxMeasurement(Array.randomItemFrom("Once a day", "Twice a day", "As needed"));
    med.startDate = new CHBase.Types.ApproxDateTime(Date.random(365));

    setCommonData(med);

    return med;    
}

function makeProcedure() {

    var name = Array.randomItemFrom("eye surgery", "root canal", "colonoscopy", "knee surgery", "tooth cleaning");

    var proc = new CHBase.ItemTypes.Procedure(name);
    proc.when = new CHBase.Types.ApproxDateTime(Date.random());

    proc.primaryProvider = makePerson();

    return proc;
}

function makeImmunization() {
    var name = Array.randomItemFrom("hepatitis A vaccine", "Polio", "Smallpox Shot", "Measles", "Anthrax Vaccine");
    var codableName = new CHBase.Types.CodableValue(name, "vaccines-foo", "xyzqr");

    var immunization = new CHBase.ItemTypes.Immunization();
    immunization.name = codableName;
    immunization.administrationDate = new CHBase.Types.ApproxDateTime(Date.random());
    immunization.manufacturer = new CHBase.Types.CodableValue("Generic Manufacturer");
    immunization.lot = Math.randomIntInRange(100, 500);
    immunization.sequence = Math.randomInRange(1, 3);
    immunization.anatomicSurface = new CHBase.Types.CodableValue("Arm");

    return immunization;
}


function makeWeight() {

    var weightValue = new CHBase.Types.WeightMeasurement();
    weightValue.inPounds = Math.roundToPrecision(Math.randomInRange(120, 150), 1);

    var weight = new CHBase.ItemTypes.Weight(CHBase.Types.StructuredDateTime.now(), weightValue);

    setCommonData(weight);

    return weight;
}

function makeBloodPressureRandom() {

    var bloodPressure = new CHBase.ItemTypes.BloodPressure();
    bloodPressure.when = CHBase.Types.StructuredDateTime.now();

    var systolic = Math.randomIntInRange(150, 120);
    bloodPressure.systolic = new CHBase.Types.NonNegativeInt(systolic);
    bloodPressure.diastolicValue = Math.randomIntInRange(70, systolic);
    bloodPressure.pulseValue = Math.randomIntInRange(60, 100);
    bloodPressure.irregularHeartbeat = new CHBase.Types.BooleanValue(false);

    setCommonData(bloodPressure);

    return bloodPressure;
}

function makeBloodPressure() {

    var bloodPressure = new CHBase.ItemTypes.BloodPressure();
    bloodPressure.when = CHBase.Types.StructuredDateTime.now();
    bloodPressure.systolic = new CHBase.Types.NonNegativeInt(120);
    bloodPressure.diastolicValue= 80;
    bloodPressure.pulseValue = 58;
    bloodPressure.irregularHeartbeat = new CHBase.Types.BooleanValue(false);

    setCommonData(bloodPressure);
    
    return bloodPressure;
}

function makeCholesterol() {

    var cholesterol = new CHBase.ItemTypes.Cholesterol();
    cholesterol.when = CHBase.Types.StructuredDateTime.now();
    cholesterol.ldlValue = new CHBase.Types.ConcentrationValue(100);
    cholesterol.hdlValue = new CHBase.Types.ConcentrationValue(200);
    cholesterol.total = new CHBase.Types.ConcentrationValue(300);
    cholesterol.triglycerides = new CHBase.Types.ConcentrationValue(75);

    setCommonData(cholesterol);

    return cholesterol;
}

function makeExercise() {

    var exercise = new CHBase.ItemTypes.Exercise();
    exercise.when = CHBase.Types.ApproxDateTime.now();
    var distance = new CHBase.Types.LengthMeasurement();
    distance.inMiles = 5.5;
    exercise.distance = distance;

    exercise.activity = new CHBase.Types.CodableValue("Biking");
    exercise.details.append(
        new CHBase.Types.StructuredNameValue(
            new CHBase.Types.CodedValue("myvocab", "mycode"),
        new CHBase.Types.StructuredMeasurement("750", "calories")));

    exercise.details.append(
        new CHBase.Types.StructuredNameValue(
            new CHBase.Types.CodedValue("myvocab", "avg-cadence"),
        new CHBase.Types.StructuredMeasurement("85", "rpm")));

    var segment = new CHBase.Types.ExerciseSegment();
    segment.activity = new CHBase.Types.CodableValue("Biking");
    segment.title = "Finn Hill";
    segment.distance = distance;
    segment.duration = new CHBase.Types.PositiveDouble("78.6");
    segment.offset = new CHBase.Types.NonNegativeDouble("10.2");
    segment.details = exercise.details;

    exercise.segments.append(segment);

    setCommonData(exercise);

    return exercise;
}

function makeEmergencyContact() {
    var emergencyContact = new CHBase.ItemTypes.Contact();

    var address = makeAddress();
    var contact = makeContact();
    var contactType = new CHBase.Types.CodableValue("Emergency Contact", new CHBase.Types.CodedValue("person-types", "1"));

    contact.address = [address];

    emergencyContact.name = new CHBase.Types.Name("test", "example" + Math.randomIntInRange(1, 10000));
    emergencyContact.contactInformation = contact;
    emergencyContact.contactType = contactType;

    setCommonData(emergencyContact);

    return emergencyContact;
}

function makeInsurance() {
    var insurance = new CHBase.ItemTypes.Insurance();
    var contact = makeContact();

    insurance.planName = "Premera Blue Cross";
    insurance.coverageType = new CHBase.Types.CodableValue("medical", "1", "coverage-types");
    insurance.carrierId = "BCBS430";
    insurance.groupNumber = "111111";
    insurance.planCode = "MSJ";
    insurance.subscriberId = "1234";
    insurance.personCode = "01";
    insurance.subscriberName = "Myself";
    insurance.subscriberDob = new CHBase.Types.StructuredDateTime(new Date(1999, 11, 17));
    insurance.isPrimary = new CHBase.Types.BooleanValue(true);
    insurance.expirationDate = new CHBase.Types.StructuredDateTime(new Date(2013, 11, 17));
    insurance.contact = contact;

    return insurance;
}

function makeHealthGoal() {
    var healthGoal = new CHBase.ItemTypes.HealthGoal();

    healthGoal.name = new CHBase.Types.CodableValue("weight-range", "goal-type", "weight");
    healthGoal.description = "description";
    healthGoal.startDate = new CHBase.Types.ApproxDateTime(new Date(2012, 2, 1));
    healthGoal.endDate = new CHBase.Types.ApproxDateTime(new Date(2013, 2, 1));
    healthGoal.associatedTypeInfo = makeGoalAssociatedTypeInfo();
    healthGoal.targetRange = makeWeightRange(130, 150);
    healthGoal.goalAdditionalRanges = makeWeightGoalAdditionalRanges();
    
    healthGoal.recurrence = new CHBase.Types.GoalRecurrence();
    healthGoal.recurrence.interval = new CHBase.Types.CodableValue("day");
    healthGoal.recurrence.timesInInterval = "1";
    
    return healthGoal;
}

function makeWeightGoalAdditionalRanges() {
    var longRange = new CHBase.Types.GoalRange();
    longRange.name = new CHBase.Types.CodableValue("range");
    
    longRange.minimum = new CHBase.Types.GeneralMeasurement();
    longRange.minimum.display = "120";
    longRange.minimum.structured = [
        new CHBase.Types.StructuredMeasurement(120, "kg"),
        new CHBase.Types.StructuredMeasurement(121, "kg"),
        new CHBase.Types.StructuredMeasurement(122, "kg")];
    
    longRange.maximum = new CHBase.Types.GeneralMeasurement();
    longRange.maximum.display = "130";
    longRange.maximum.structured = [
        new CHBase.Types.StructuredMeasurement(130, "kg"),
        new CHBase.Types.StructuredMeasurement(131, "kg"),
        new CHBase.Types.StructuredMeasurement(132, "kg")];

    return [
        longRange,
        makeWeightRange(null, 100 * Math.random()),
        makeWeightRange(100 * Math.random(), null),
        makeWeightRange(10, 10)
    ];
}

function makeWeightRange(min, max) {
    var unitsCode = new CHBase.Types.CodedValue("weight-units", "lb");
    unitsCode.vocabFamily = "wc";

    var range = new CHBase.Types.GoalRange();
    range.name = new CHBase.Types.CodableValue("range");
    range.description = "range description";

    if (min) {
        range.minimum = new CHBase.Types.GeneralMeasurement();
        range.minimum.display = min;
        range.minimum.structured = [new CHBase.Types.StructuredMeasurement(min, "lb")];
        range.minimum.structured[0].units.codes.append(unitsCode);
    }

    if (max) {
        range.maximum = new CHBase.Types.GeneralMeasurement();
        range.maximum.display = max;
        range.maximum.structured = [new CHBase.Types.StructuredMeasurement(max, "lb")];
        range.maximum.structured[0].units.codes.append(unitsCode);
    }

    return range;
}

function makeGoalAssociatedTypeInfo() {
    var typeInfo = new CHBase.Types.GoalAssociatedTypeInfo();
    typeInfo.thingTypeVersionId = "C0DEBEEF-C0DE-BEEF-C0DE-BEEFC0DEBEEF";
    typeInfo.thingTypeDisplayXpath = "display-xpath";
    typeInfo.thingTypeValueXpath = "value-xpath";
    return typeInfo;
}

function makeBloodGlucose() {
    var wholeBlood = new CHBase.Types.CodedValue();
    wholeBlood.code = "wb";
    wholeBlood.vocabFamily = "wc";
    wholeBlood.vocabName = "glucose-measurement-type";
    wholeBlood.vocabVersion = "1";

    var fasting = new CHBase.Types.CodedValue();
    fasting.code = "fasting";
    fasting.vocabFamily = "wc";
    fasting.vocabName = "glucose-measurement-context";
    fasting.vocabVersion = "1";

    var glucose = new CHBase.ItemTypes.BloodGlucose();
    glucose.when = CHBase.Types.StructuredDateTime.now();
    glucose.value = new CHBase.Types.BloodGlucoseMeasurement(3 + (4 * Math.random()));
    glucose.measurementType = new CHBase.Types.CodableValue("Whole Blood", wholeBlood);
    glucose.outsideOperatingTemperature = new CHBase.Types.BooleanValue(false);
    glucose.isControlTest = new CHBase.Types.BooleanValue(false);
    glucose.normalcy = new CHBase.Types.OneToFive(3);
    glucose.measurementContext = new CHBase.Types.CodableValue("Fasting", fasting);
    return glucose;
}