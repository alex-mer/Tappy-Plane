using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Score : MonoBehaviour {
    private int _score = 0;

    public void updateScore() {
        _score++;
        GetComponent<Text>().text = _score.ToString();
    }
}
