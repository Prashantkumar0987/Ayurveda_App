app.post("/recommend", (req, res) => {
    const userSymptoms = req.body.symptoms;

    if (!userSymptoms) {
        return res.json({ message: "No symptoms provided" });
    }

    let bestMatch = null;
    let maxScore = 0;

    data.forEach((item) => {
        let score = 0;

        item.symptoms.forEach((symptom) => {
            if (userSymptoms.includes(symptom)) {
                score++;
            }
        });

        if (score > maxScore) {
            maxScore = score;
            bestMatch = item;
        }
    });

    res.json(bestMatch || { message: "No match found" });
});
