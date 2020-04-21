import React, { useEffect, useState } from 'react';

import api from './services/api';

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default function App() {
  const [repositories, setRepositories] = useState([]);

  async function loadRepositories() {
    const { data } = await api.get('repositories');

    setRepositories(data);
  }

  useEffect(() => {
    loadRepositories();
  }, []);

  async function handleLikeRepository(id) {
    const { data: repositoryLiked } = await api.post(`repositories/${id}/like`);
    const repoUpdate = repositories.map((repository) => {
      if (repository.id === id) {
        return repositoryLiked;
      } else {
        return repository;
      }
    });

    setRepositories(repoUpdate);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const repositoriesUpdated = repositories.filter(
      (repository) => repository.id !== id,
    );
    setRepositories([...repositoriesUpdated]);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={repositories}
          keyExtractor={(repository) => repository.id}
          renderItem={({ item: repository }) => (
            <>
              <View style={styles.repositoryContainer}>
                <Text style={styles.repository}>{repository.title}</Text>

                <View style={styles.techsContainer}>
                  {/* <Text style={styles.tech}>{repository.techs}</Text> */}
                  {repository.techs.map((tech) => (
                    <Text key={tech} style={styles.tech}>
                      {tech}1
                    </Text>
                  ))}
                </View>

                <View style={styles.likesContainer}>
                  <Text
                    style={styles.likeText}
                    // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                    testID={`repository-likes-${repository.id}`}>
                    {repository.likes ? repository.likes : '0'} curtidas
                  </Text>
                </View>
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleLikeRepository(repository.id)}
                    // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                    testID={`like-button-${repository.id}`}>
                    <Text style={styles.buttonText}>Curtir</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.buttonDelete}
                    onPress={() => handleRemoveRepository(repository.id)}
                    // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                    testID={`like-button-${repository.id}`}>
                    <Text style={styles.buttonText}>Remover</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: '#fff',
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  techsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 10,
    backgroundColor: '#04d361',
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#999',
    borderRadius: 2,
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  likeText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    flex: 1,
    maxWidth: 150,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    backgroundColor: '#7159c1',
  },
  buttonDelete: {
    flex: 1,
    maxWidth: 150,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    backgroundColor: '#ff7675',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
