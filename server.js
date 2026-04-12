app.post("/recommend", (req, res) => {
    try {
        const userSymptoms = req.body.symptoms || [];

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

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});
