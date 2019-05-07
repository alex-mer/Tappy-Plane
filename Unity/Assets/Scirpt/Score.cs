using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Score : MonoBehaviour {
    private int _score = 0;
    private int _topScore = 0;

    public void Start() {
        _score = 0;
        GetComponent<Text>().text = _score.ToString();
    }

    public void updateScore() {
        _score++;
        GetComponent<Text>().text = _score.ToString();

        if (_score > _topScore) {
            _topScore = _score;
        }
    }

    public int getTopScore() {
        return _topScore;
    }
}
