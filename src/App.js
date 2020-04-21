import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native';

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
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [techs, setTechs] = useState('');

  async function loadRepositories() {
    const { data } = await api.get('repositories');

    setRepositories(data);
  }

  useEffect(() => {
    loadRepositories();
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title,
      url,
      techs: techs.split(',').map((tech) => tech.trim()),
    });

    setTitle('');
    setUrl('');
    setTechs('');

    setRepositories([...repositories, response.data]);
  }

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
        <View style={styles.formInput}>
          <TextInput
            style={styles.Input}
            value={title}
            onChangeText={setTitle}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Insira o título..."
          />
          <TextInput
            style={styles.Input}
            value={url}
            onChangeText={setUrl}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Insira a url..."
          />
          <TextInput
            style={styles.Input}
            value={techs}
            onChangeText={setTechs}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Insira o título..."
          />
          <TouchableOpacity
            style={styles.buttonAdd}
            onPress={() => handleAddRepository()}>
            <Text style={styles.buttonText}>Adicionar</Text>
          </TouchableOpacity>
        </View>

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
  formInput: {
    width: '100%',
    height: 'auto',
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 8,
  },
  Input: {
    width: 300,
    height: 35,
    borderRadius: 5,
    borderWidth: 1,
    fontSize: 14,
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 7,
    borderColor: '#999',
    backgroundColor: '#eee',
  },
  buttonAdd: {
    width: 300,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    backgroundColor: '#00b894',
    marginBottom: 12,
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
